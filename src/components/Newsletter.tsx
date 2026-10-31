'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      router.push('/thank-you')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        placeholder="Jūsų el. pašto adresas"
        aria-label="El. pašto adresas"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-auto appearance-none rounded-md border border-line bg-surface px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-heading/5 placeholder:text-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 sm:text-sm"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:bg-accent-strong disabled:opacity-50 active:transition-none"
      >
        {status === 'loading' ? 'Siųnčiama...' : 'Prenumeruoti naujienlaiškį'}
      </button>

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-500 sm:absolute sm:mt-12">
          Įvyko klaida. Bandykite dar kartą.
        </p>
      )}
    </form>
  )
}
