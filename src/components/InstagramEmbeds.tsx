// "use client" because we dynamically load Instagram's embed script and call
// the embed processor.
'use client'

import { useEffect, useMemo, useState } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void
      }
    }
  }
}

export type InstagramEmbedItem = {
  id: string
  /** e.g. https://www.instagram.com/reel/SHORTCODE/ or /p/SHORTCODE/ */
  url: string
  thumbnailSrc?: string
  thumbnailAlt?: string
}

function loadInstagramEmbedScript() {
  return new Promise<void>((resolve) => {
    if (typeof document === 'undefined') return resolve()

    const existing = document.getElementById('instagram-embed-script')
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = 'instagram-embed-script'
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => resolve()
    document.body.appendChild(script)
  })
}

export function InstagramEmbeds({ items }: { items: InstagramEmbedItem[] }) {
  const [embedReady, setEmbedReady] = useState(false)

  const embedsKey = useMemo(() => items.map((i) => i.id).join('|'), [items])

  useEffect(() => {
    let cancelled = false

    async function start() {
      setEmbedReady(false)
      await loadInstagramEmbedScript()
      if (cancelled) return

      try {
        window.instgrm?.Embeds?.process()
      } catch {
        // If Instagram embed fails to process (e.g. blocked), keep the thumbnail fallback.
      }

      let attempts = 0
      const maxAttempts = 10
      const intervalMs = 250

      const timer = window.setInterval(() => {
        if (cancelled) {
          window.clearInterval(timer)
          return
        }

        attempts += 1

        const hasIframe =
          document.querySelectorAll('iframe[src*="instagram.com"]').length > 0

        if (hasIframe) {
          window.clearInterval(timer)
          setEmbedReady(true)
        } else if (attempts >= maxAttempts) {
          window.clearInterval(timer)
        }
      }, intervalMs)
    }

    start()
    return () => {
      cancelled = true
    }
  }, [embedsKey])

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative mx-auto w-full max-w-80 overflow-hidden rounded-xl bg-subtle ring-1 ring-line transition duration-200 hover:shadow-lg hover:shadow-heading/10 hover:ring-2 hover:ring-accent motion-safe:hover:-translate-y-1 sm:rounded-2xl"
        >
          {/* Instagram's embed UI includes a top profile header; a slightly shorter
              tile reduces vertical cropping. */}
          <div className="aspect-[5/7]">
            <div className="relative h-full w-full">
              {!embedReady && item.thumbnailSrc ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0"
                  aria-label="Open Instagram reel"
                >
                  <img
                    src={item.thumbnailSrc}
                    alt={item.thumbnailAlt ?? ''}
                    className="h-full w-full object-cover"
                  />
                </a>
              ) : null}

              <blockquote
                className="instagram-media"
                data-instgrm-permalink={item.url}
                data-instgrm-version="14"
                style={{ width: '100%', margin: 0, padding: 0 }}
              >
                <a href={item.url} target="_blank" rel="noreferrer">
                  View on Instagram
                </a>
              </blockquote>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
