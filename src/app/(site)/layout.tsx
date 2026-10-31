import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/app/providers'
import { getAccent } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const accent = await getAccent()

  return (
    <Providers>
      {/* contents: keeps header, main and footer as flex items of <body> */}
      <div data-accent={accent} className="contents">
        <Header />
        <main className="flex-1 pb-16 sm:pb-32">{children}</main>
        <Footer />
      </div>
    </Providers>
  )
}
