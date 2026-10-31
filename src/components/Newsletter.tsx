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
        className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-accent-400 dark:focus:ring-accent-400/10"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:opacity-50 active:transition-none dark:bg-accent-400 dark:text-zinc-900 dark:hover:bg-accent-300"
      >
        {status === 'loading' ? 'Siųnčiama...' : 'Prenumeruoti naujienlaiškį'}
      </button>

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-500 sm:absolute sm:mt-12 dark:text-red-400">
          Įvyko klaida. Bandykite dar kartą.
        </p>
      )}
    </form>
  )
}
