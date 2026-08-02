import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { urlFor } from '@/sanity/lib/image'
import { getAllPosts, getPostBySlug } from '@/sanity/lib/queries'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return { title: post.title, description: post.excerpt }
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value).width(1200).url()}
        alt={value.alt ?? ''}
        width={1200}
        height={800}
        className="rounded-2xl"
      />
    ),
  },
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-0">
        <Link
          href="/articles"
          className="text-sm font-medium text-teal-500 transition hover:text-teal-600"
        >
          ← Visi straipsniai
        </Link>
        <article className="mt-8">
          <header className="flex flex-col">
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              {post.title}
            </h1>
            <time
              dateTime={post.publishedAt}
              className="order-first text-base text-zinc-400 dark:text-zinc-500"
            >
              {formatDate(post.publishedAt)}
            </time>
          </header>
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt=""
              width={1600}
              height={900}
              className="mt-8 rounded-2xl"
            />
          )}
          {post.body && (
            <Prose className="mt-8">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </Prose>
          )}
        </article>
      </div>
    </Container>
  )
}
