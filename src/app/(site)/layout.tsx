import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/app/providers'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Header />
      <main className="flex-1 pb-16 sm:pb-32">{children}</main>
      <Footer />
    </Providers>
  )
}
