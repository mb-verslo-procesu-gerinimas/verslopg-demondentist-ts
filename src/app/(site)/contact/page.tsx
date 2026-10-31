import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Newsletter } from '@/components/Newsletter'
import { Parallax } from '@/components/Parallax'
import portraitImage from '@/images/raminta_portrait.jpg'
import { FacebookIcon, InstagramIcon, MailIcon } from '@/components/SocialIcons'
import { urlFor } from '@/sanity/lib/image'
import { getContactPage } from '@/sanity/lib/queries'

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
        className="group flex text-sm font-medium text-heading transition hover:text-accent"
      >
        <Icon className="h-6 w-6 flex-none fill-muted transition group-hover:fill-accent" />
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

export default async function Contact() {
  const contact = await getContactPage()

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-y-12">
        <div className="order-2 px-4 sm:px-0 lg:order-1">
          <h1 className="text-center text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-left">
            {contact.title}
          </h1>
          <ul role="list" className="mt-8 sm:mt-12">
            <SocialLink href={contact.instagramUrl} icon={InstagramIcon}>
              {contact.instagramLabel}
            </SocialLink>
            <SocialLink
              href={contact.facebookUrl}
              icon={FacebookIcon}
              className="mt-4"
            >
              {contact.facebookLabel}
            </SocialLink>
            <SocialLink
              href={`mailto:${contact.email}`}
              icon={MailIcon}
              className="mt-4"
            >
              {contact.email}
            </SocialLink>
          </ul>
          <div className="mt-10">
            <Newsletter />
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:pl-20">
          <div className="mx-auto max-w-xs px-2.5 lg:mx-0 lg:max-w-none">
            <div className="relative aspect-square rotate-0 overflow-hidden rounded-2xl bg-subtle ring-1 ring-line">
              <Parallax speed={0.2} className="absolute inset-x-0 -inset-y-12">
                <Image
                  src={
                    contact.image
                      ? urlFor(contact.image).width(1024).height(1200).url()
                      : portraitImage
                  }
                  alt="Demonė Dantistė"
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  fill
                  className="object-cover"
                  priority
                />
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
