import Link from 'next/link'

import { Container } from '@/components/Container'
import { FacebookIcon, InstagramIcon, MailIcon } from '@/components/SocialIcons'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-700/40 dark:bg-zinc-900">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Demonė Dantistė. Visos teisės
            saugomos.
          </p>
          <div className="flex gap-4">
            <Link href="mailto:r.vaskelaite@gmail.com" aria-label="El. paštas">
              <MailIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-teal-500" />
            </Link>
            <Link
              href="https://www.instagram.com/demone.dantiste"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-teal-500" />
            </Link>
            {/* TODO: replace with the real Facebook page URL */}
            <Link
              href="https://www.facebook.com/demonedantiste"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-teal-500" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
