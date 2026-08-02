'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 4.5v-2m0 19v-2m7.5-7.5h2m-19 0h2m13.36-5.86 1.42-1.42M4.72 19.28l1.42-1.42m0-11.32L4.72 4.72m14.56 14.56-1.42-1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
    </svg>
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label="Perjungti šviesų/tamsų režimą"
      className={clsx(
        'flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:ring-zinc-900/10 dark:bg-zinc-800 dark:ring-white/10 dark:hover:ring-white/20',
        className,
      )}
      onClick={() =>
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }
    >
      {mounted && resolvedTheme === 'dark' ? (
        <SunIcon className="h-5 w-5 stroke-zinc-500 stroke-2" fill="none" />
      ) : (
        <MoonIcon
          className="h-5 w-5 fill-zinc-500"
          style={{ visibility: mounted ? 'visible' : 'hidden' }}
        />
      )}
    </button>
  )
}
