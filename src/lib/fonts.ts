import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

export const googleSans = localFont({
  src: [
    {
      path: '../../public/fonts/google-sans/static/GoogleSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/google-sans/static/GoogleSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/google-sans/static/GoogleSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/google-sans/static/GoogleSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/google-sans/static/GoogleSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-google-sans',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
