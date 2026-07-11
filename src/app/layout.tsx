import type { Metadata } from 'next'
import { googleSans, jetbrainsMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Network Engineer Roadmap',
  description:
    'A beginner-centric, interactive network engineering roadmap and progress tracker for CSE students.',
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
