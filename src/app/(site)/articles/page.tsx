import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CalendarIcon } from '@/components/CalendarIcon'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { urlFor } from '@/sanity/lib/image'
import { getAllPosts } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Straipsniai',
  description:
    'Straipsniai apie dantų sveikatą, profilaktiką ir vaikų odontologiją.',
}

export default async function ArticlesIndex() {
  const posts = await getAllPosts()

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="px-4 sm:px-0">
        <PageIntro field="articlesIntro" />
        <div className="mt-16 sm:mt-20">
          {posts.length === 0 ? (
            <p className="text-base text-body">
              Straipsnių dar nėra. Užsukite vėliau!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="rounded-2xl border border-line bg-surface p-6 transition hover:border-line hover:bg-subtle hover:shadow-sm"
                  >
                    <Link href={`/articles/${post.slug}`} className="group block">
                      {post.mainImage && (
                        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-subtle ring-1 ring-line">
                          <Image
                            src={urlFor(post.mainImage)
                              .width(800)
                              .height(450)
                              .url()}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 30rem, (min-width: 640px) 45vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <Card>
                        <Card.Eyebrow
                          as="time"
                          dateTime={post.publishedAt}
                          className="flex items-center gap-1.5"
                        >
                          <CalendarIcon className="h-3.5 w-3.5 stroke-current" />
                          {formatDate(post.publishedAt)}
                        </Card.Eyebrow>
                        <Card.Title>
                          {post.title}
                        </Card.Title>
                        {post.excerpt && (
                          <Card.Description>{post.excerpt}</Card.Description>
                        )}
                        <p className="mt-4 text-sm font-medium text-accent transition group-hover:text-accent-strong">
                          Skaityti straipsnį
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
