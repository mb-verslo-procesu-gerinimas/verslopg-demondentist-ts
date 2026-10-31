import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { urlFor } from '@/sanity/lib/image'
import { getAllVeikla, getVeiklaBySlug } from '@/sanity/lib/queries'

export const revalidate = 60

export async function generateStaticParams() {
  const items = await getAllVeikla()
  return items.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getVeiklaBySlug(slug)

  if (!item) return {}

  return { title: item.title, description: item.description }
}

export default async function VeiklaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getVeiklaBySlug(slug)

  if (!item) {
    notFound()
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-0">
        <Link
          href="/mano-veikla"
          className="text-sm font-medium text-accent-500 transition hover:text-accent-600"
        >
          ← Visa veikla
        </Link>
        <article className="mt-8">
          <header className="flex flex-col">
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              {item.title}
            </h1>
            <time
              dateTime={item.publishedAt}
              className="order-first text-base text-zinc-400 dark:text-zinc-500"
            >
              {formatDate(item.publishedAt)}
            </time>
          </header>
          {item.mainImage && (
            <Image
              src={urlFor(item.mainImage).width(1600).height(900).url()}
              alt=""
              width={1600}
              height={900}
              className="mt-8 rounded-2xl"
            />
          )}
          <Prose className="mt-8">
            {item.body && item.body.length > 0 ? (
              <PortableText value={item.body} />
            ) : (
              <p>{item.description}</p>
            )}
          </Prose>
          {item.link && (
            <Link
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block text-sm font-medium text-accent-500 transition hover:text-accent-600"
            >
              Daugiau informacijos →
            </Link>
          )}
        </article>
      </div>
    </Container>
  )
}
