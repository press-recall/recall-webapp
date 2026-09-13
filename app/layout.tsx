import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono-ui',
})

export const metadata: Metadata = {
  title: 'Recall — A Memory Puzzle',
  description:
    'Recall is a minimal psychological puzzle game. Remember what you saw, notice the relationships, and decide: press, or don\u2019t press.',
  generator: 'Realxein',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#131211',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${fraunces.variable} ${geistMono.variable}`}>
      <body className="antialiased font-mono">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <div className="absolute bottom-5 right-5 text-xs text-muted-foreground">
          <span>Created By <Link href={"https://github.com/mrxein"} className="text-primary">Realxein</Link></span>
        </div>
      </body>
    </html>
  )
}
