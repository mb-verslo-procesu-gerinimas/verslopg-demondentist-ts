import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { InstagramEmbeds } from '@/components/InstagramEmbeds'
import { PageIntro } from '@/components/PageIntro'
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
        <PageIntro field="reelsIntro" />
        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:gap-8 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {instagramItems.length === 0 ? (
            <p className="text-base text-body">
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
