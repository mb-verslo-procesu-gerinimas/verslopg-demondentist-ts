import Link from 'next/link'

import { Container } from '@/components/Container'
import { FacebookIcon, InstagramIcon, MailIcon } from '@/components/SocialIcons'
import { getContactPage } from '@/sanity/lib/queries'

export async function Footer() {
  const contact = await getContactPage()

  return (
    <footer className="border-t border-bar-line bg-bar">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <p className="text-sm text-on-bar">
            &copy; {new Date().getFullYear()} Demonė Dantistė. Visos teisės
            saugomos.
          </p>
          <div className="flex gap-4">
            <Link href={`mailto:${contact.email}`} aria-label="El. paštas">
              <MailIcon className="h-6 w-6 fill-on-bar transition hover:fill-bar-accent" />
            </Link>
            <Link
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-6 w-6 fill-on-bar transition hover:fill-bar-accent" />
            </Link>
            <Link
              href={contact.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-6 w-6 fill-on-bar transition hover:fill-bar-accent" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
