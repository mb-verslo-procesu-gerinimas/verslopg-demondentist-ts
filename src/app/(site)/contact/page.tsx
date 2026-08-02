import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import avatarImage from '@/images/raminta_avatar.jpg'
import { FacebookIcon, InstagramIcon, MailIcon } from '@/components/SocialIcons'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'Kontaktai',
  description:
    'Susisiekite su Demone Dantiste socialiniuose tinkluose arba el. paštu.',
}

export default function Contact() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="px-4 sm:px-0">
        <div className="flex items-center gap-4">
          <Image
            src={avatarImage}
            alt=""
            className="h-12 w-12 flex-none rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700/40"
          />
          <p className="w-fit max-w-2xl rounded-2xl bg-white px-4 py-3 text-base text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            Čia rasite mano socialinių tinklų paskyras, taip pat galite susisiekti
            su manimi el. paštu.
          </p>
        </div>
        <ul role="list" className="mt-16 sm:mt-20">
          <SocialLink
            href="https://www.instagram.com/demone.dantiste"
            icon={InstagramIcon}
          >
            demone.dantiste
          </SocialLink>
          <SocialLink
            href="https://www.facebook.com/demonedantiste/"
            icon={FacebookIcon}
            className="mt-4"
          >
            demonedantiste
          </SocialLink>
          <SocialLink
            href="mailto:r.vaskelaite@gmail.com"
            icon={MailIcon}
            className="mt-4"
          >
            r.vaskelaite@gmail.com
          </SocialLink>
        </ul>
      </div>
    </Container>
  )
}
