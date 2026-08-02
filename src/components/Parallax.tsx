'use client'

import { useEffect, useRef } from 'react'

export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false

    // Offset is zero at the scroll position where the page loaded, and
    // grows/shrinks purely with how far the user has scrolled since then,
    // so there's no jump on mount and no feedback loop from re-measuring
    // the already-transformed element.
    const startScrollY = window.scrollY

    function update() {
      ticking = false
      if (!el) return
      const offset = (window.scrollY - startScrollY) * speed
      el.style.transform = `translateY(${offset}px)`
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}


