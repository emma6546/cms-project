import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

import { SITE_METADATA } from '@/lib/constants'

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.name,
    template: `%s | ${SITE_METADATA.name}`,
  },
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.url),
  openGraph: {
    type: 'website',
    siteName: SITE_METADATA.name,
    title: SITE_METADATA.name,
    description: SITE_METADATA.description,
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.name,
    description: SITE_METADATA.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
