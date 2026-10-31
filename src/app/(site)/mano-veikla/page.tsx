import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CalendarIcon } from '@/components/CalendarIcon'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { urlFor } from '@/sanity/lib/image'
import { getAllVeikla } from '@/sanity/lib/queries'

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
        <PageIntro field="veiklaIntro" />
        <div className="mt-16 sm:mt-20">
          {items.length === 0 ? (
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Veiklos įrašų dar nėra. Užsukite vėliau!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item._id}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700/40 dark:bg-zinc-900/60 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/60"
                >
                  <Link href={`/mano-veikla/${item.slug}`} className="group block">
                    {item.mainImage && (
                      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700/40">
                        <Image
                          src={urlFor(item.mainImage).width(800).height(450).url()}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <Card>
                      <Card.Eyebrow
                        as="time"
                        dateTime={item.publishedAt}
                        className="flex items-center gap-1.5"
                      >
                        <CalendarIcon className="h-3.5 w-3.5 stroke-current" />
                        {formatDate(item.publishedAt)}
                      </Card.Eyebrow>
                      <div className="relative z-10">
                        <Card.Title>{item.title}</Card.Title>
                      </div>
                      {item.description && (
                        <Card.Description>{item.description}</Card.Description>
                      )}
                      <p className="relative z-10 mt-4 text-sm font-medium text-accent-500 transition group-hover:text-accent-600">
                        Skaityti daugiau
                      </p>
                    </Card>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
