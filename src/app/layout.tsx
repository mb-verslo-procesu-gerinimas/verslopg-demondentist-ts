import { type Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: 'Under Construction',
  description: 'A fresh Next.js + TypeScript starting point.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-full bg-zinc-50">{children}</body>
    </html>
  )
}
