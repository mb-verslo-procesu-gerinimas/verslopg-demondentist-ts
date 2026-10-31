import { type Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Ačiū',
  description: 'Ačiū, kad užsiprenumeravote naujienlaiškį.',
}

export default function ThankYou() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Ačiū!
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Sėkmingai užsiprenumeravote naujienlaiškį.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block text-sm font-medium text-accent-500 transition hover:text-accent-600"
        >
          ← Grįžti į pradžią
        </Link>
      </div>
    </Container>
  )
}
