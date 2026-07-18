import type { Metadata } from 'next'
import { googleSans, jetbrainsMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: 'Network Engineer Roadmap',
  description:
    'A beginner-centric, interactive network engineering roadmap and progress tracker for CSE students.',
  openGraph: {
    title: 'Network Engineer Roadmap',
    description:
      'A scenario-based path for CSE students who want to compete with dedicated networking graduates.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Network Engineer Roadmap',
    description:
      'A scenario-based path for CSE students who want to compete with dedicated networking graduates.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${googleSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
