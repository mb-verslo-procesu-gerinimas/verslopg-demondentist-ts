'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Container } from '@/components/Container'

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
    <header className="border-b border-bar-line bg-bar">
      <Container>
        <div className="flex h-16 items-center justify-between px-2 sm:px-0">
          <Link
            href="/"
            aria-label="Pradžia"
            className="flex text-on-bar transition hover:text-bar-accent"
          >
            <HomeIcon className="h-6 w-6 stroke-current" />
          </Link>
          <nav className="hidden justify-center md:flex">
            <ul className="flex gap-6 text-sm font-medium text-on-bar">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'transition hover:text-bar-accent',
                      pathname === item.href && 'text-bar-accent',
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Atidaryti meniu"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-bar-line text-on-bar transition hover:border-bar-line hover:text-bar-accent md:hidden"
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
            className="border-t border-bar-line py-2 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block rounded-lg px-3 py-2 text-sm font-medium text-on-bar transition hover:bg-on-bar/10 hover:text-bar-accent',
                      pathname === item.href && 'bg-on-bar/10 text-bar-accent',
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  )
}
