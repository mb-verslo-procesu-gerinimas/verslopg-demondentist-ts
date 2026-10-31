import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getPalette } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const palette = await getPalette()

  return (
    <div data-palette={palette} className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1 pb-16 sm:pb-32">{children}</main>
      <Footer />
    </div>
  )
}
