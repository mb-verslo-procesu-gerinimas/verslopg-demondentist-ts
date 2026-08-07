import { type Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import avatarImage from '@/images/raminta_avatar.jpg'
import { InstagramEmbeds } from '@/components/InstagramEmbeds'
import { getAllReels } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Reels',
  description: 'Naujausi Demonės Dantistės vaizdo įrašai iš Instagram.',
}

export default async function Reels() {
  const reels = await getAllReels()
  const instagramItems = reels.map((reel) => ({
    id: reel._id,
    url: reel.url,
    thumbnailAlt: 'Instagram reel thumbnail',
  }))

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
            Čia rasite mano naujausius vaizdo įrašus iš Instagram.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:gap-8 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {instagramItems.length === 0 ? (
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Reelų dar nėra. Užsukite vėliau!
            </p>
          ) : (
            <InstagramEmbeds items={instagramItems} />
          )}
        </div>
      </div>
    </Container>
  )
}
