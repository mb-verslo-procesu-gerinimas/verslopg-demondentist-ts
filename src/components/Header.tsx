'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { ThemeToggle } from '@/components/ThemeToggle'

function HomeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 11.5 12 4l9 7.5M5.5 9.75V19a1 1 0 0 0 1 1H9.5v-5.25a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V20h3a1 1 0 0 0 1-1V9.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const navigation = [
  { name: 'Apie mane', href: '/apie-mane' },
  { name: 'Mano veikla', href: '/mano-veikla' },
  { name: 'Straipsniai', href: '/articles' },
  { name: 'Reels', href: '/reels' },
  { name: 'Kontaktai', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="border-b border-zinc-100 bg-white/80 backdrop-blur dark:border-zinc-700/40 dark:bg-zinc-900/80">
      <Container>
        <div className="flex h-16 items-center justify-between px-2 sm:px-0">
          <Link
            href="/"
            aria-label="Pradžia"
            className="flex text-zinc-600 transition hover:text-accent-500 dark:text-zinc-200"
          >
            <HomeIcon className="h-6 w-6 stroke-current" />
          </Link>
          <nav className="hidden justify-center md:flex">
            <ul className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-200">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'transition hover:text-accent-500',
                      pathname === item.href && 'text-accent-500',
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden md:flex" />
            <button
              type="button"
              aria-label="Atidaryti meniu"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:border-zinc-300 hover:text-accent-500 md:hidden dark:border-zinc-700/40 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-5 w-5 stroke-current"
              >
                {isMenuOpen ? (
                  <path
                    d="M6 6 18 18M18 6 6 18"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-zinc-100 py-2 md:hidden dark:border-zinc-700/40"
          >
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-accent-500 dark:text-zinc-200 dark:hover:bg-zinc-800/70',
                      pathname === item.href && 'bg-zinc-100 text-accent-500 dark:bg-zinc-800/70',
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-zinc-100 pt-3 dark:border-zinc-700/40">
                <div className="px-3">
                  <ThemeToggle className="h-9 w-9" />
                </div>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  )
}
