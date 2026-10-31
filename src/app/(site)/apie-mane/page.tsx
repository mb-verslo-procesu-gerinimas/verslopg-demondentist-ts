import { type Metadata } from 'next'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

import { Container } from '@/components/Container'
import portraitImage from '@/images/raminta_portrait_academia.jpg'
import { urlFor } from '@/sanity/lib/image'
import { getAboutMeContent } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Apie mane',
  description:
    'Susipažinkite su gydytoja Raminta – bendrosios praktikos gydytoja odontologe.',
}

export const revalidate = 60

const aboutMePortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-7 last:mb-0">{children}</p>,
  },
}

export default async function AboutMe() {
  const aboutMeContent = await getAboutMeContent()
  // Uploaded photos are cropped to the default portrait's shape to keep the layout.
  const imageWidth = 1024
  const imageHeight = Math.round(
    (imageWidth * portraitImage.height) / portraitImage.width,
  )

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
        <div className="flex items-start">
          <Image
            src={
              aboutMeContent?.image
                ? urlFor(aboutMeContent.image)
                    .width(imageWidth)
                    .height(imageHeight)
                    .url()
                : portraitImage
            }
            width={imageWidth}
            height={imageHeight}
            alt="Raminta"
            sizes="(min-width: 1024px) 32rem, 20rem"
            className="w-full rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-700/40"
          />
        </div>
        <div className="px-4 lg:px-0">
          <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl lg:text-left dark:text-zinc-100">
            {aboutMeContent?.title ?? 'Apie mane'}
          </h1>
          <p className="mt-4 text-center text-base font-medium text-teal-500 lg:text-left">
            {aboutMeContent?.role ?? 'Bendrosios praktikos gydytoja odontologė'}
          </p>
          <p className="text-center text-sm text-zinc-500 lg:text-left dark:text-zinc-400">
            {aboutMeContent?.license ?? 'Licencijos Nr. OPL-04229'}
          </p>
          <div className="mt-6 space-y-7 text-justify text-base text-zinc-600 lg:text-left dark:text-zinc-400">
            {aboutMeContent?.body && aboutMeContent.body.length > 0 && (
              <PortableText
                value={aboutMeContent.body}
                components={aboutMePortableTextComponents}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
