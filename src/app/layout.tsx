import { type Metadata } from 'next'
import { Manrope } from 'next/font/google'

import '@/styles/tailwind.css'

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Demonė Dantistė',
    default:
      'Demonė Dantistė - Dantų gydytoja, turinti didžiulį susidomėjimą profilaktika ir visuomeniniu dantų sveikatos švietimu.',
  },
  description:
    'Dantų gydytoja, turinti didžiulį susidomėjimą profilaktika ir visuomeniniu dantų sveikatos švietimu. Mane domina dantų sveikatos statistikos gerinimas Lietuvoje, ypač vaikų odontologijoje.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="lt"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-zinc-50 dark:bg-black">
        {children}
      </body>
    </html>
  )
}

