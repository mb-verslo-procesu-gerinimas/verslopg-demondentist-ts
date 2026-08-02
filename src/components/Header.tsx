'use client'

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
  { name: 'Straipsniai', href: '/articles' },
  { name: 'Reels', href: '/reels' },
  { name: 'Kontaktai', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-zinc-100 bg-white/80 backdrop-blur dark:border-zinc-700/40 dark:bg-zinc-900/80">
      <Container>
        <div className="flex h-16 items-center justify-between px-2 sm:px-0">
          <Link
            href="/"
            aria-label="Pradžia"
            className="flex text-zinc-600 transition hover:text-teal-500 dark:text-zinc-200"
          >
            <HomeIcon className="h-6 w-6 stroke-current" />
          </Link>
          <nav className="flex justify-center">
            <ul className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-200">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'transition hover:text-teal-500',
                      pathname === item.href && 'text-teal-500',
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}
