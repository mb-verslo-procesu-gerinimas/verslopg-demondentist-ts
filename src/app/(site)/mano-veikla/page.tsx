import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { urlFor } from '@/sanity/lib/image'
import { getAllVeikla } from '@/sanity/lib/queries'
import avatarImage from '@/images/raminta_avatar.jpg'


export const revalidate = 60

export const metadata: Metadata = {
  title: 'Mano veikla',
  description: 'Veiklos sritys ir projektai.',
}

export default async function ManoVeikla() {
  const items = await getAllVeikla()

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="px-4 sm:px-0">
        <div className="flex items-center gap-4">
          <Image
            src={avatarImage}
            alt=""
            className="h-12 w-12 flex-none rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700/40"
          />
          <p className="w-fit max-w-2xl rounded-2xl bg-white px-4 py-3 text-base text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 ring-1 ring-zinc-200 dark:ring-zinc-700/40">
            Čia rasite informaciją apie mano veiklas, pasiekimus ir projektus, susijusius su odontologija ir burnos sveikata.
          </p>
        </div>
        <div className="mt-16 sm:mt-20">
          {items.length === 0 ? (
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Veiklos įrašų dar nėra. Užsukite vėliau!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card
                  key={item._id}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700/40 dark:bg-zinc-900/60 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/60"
                >
                  {item.icon && (
                    <div className="relative z-10 mb-4 h-12 w-12 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700/40">
                      <Image
                        src={urlFor(item.icon).width(96).height(96).url()}
                        alt=""
                        fill
                        sizes="3rem"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="relative z-10">
                    <Card.Title>{item.title}</Card.Title>
                  </div>
                  {item.description && (
                    <Card.Description>{item.description}</Card.Description>
                  )}
                  {item.link && (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="relative z-10 mt-4 text-sm font-medium text-accent-500 transition hover:text-accent-600"
                    >
                      Skaityti daugiau
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
