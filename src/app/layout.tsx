import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import '@/styles/globals.scss'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const BASE_URL = 'https://pileuszu.github.io/portfolio-website'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'JiHwan Kim — AI Engineer & Full-Stack Developer',
    template: '%s | JiHwan Kim',
  },
  description:
    'AI Engineer and Full-Stack Developer specializing in bridging advanced AI research and production-ready web systems. Proficient in Next.js, React, Python, and large-scale ML pipelines.',
  keywords: [
    'AI Engineer',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'Python',
    'Machine Learning',
    'Portfolio',
    'JiHwan Kim',
  ],
  authors: [{ name: 'JiHwan Kim', url: BASE_URL }],
  creator: 'JiHwan Kim',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'JiHwan Kim Portfolio',
    title: 'JiHwan Kim — AI Engineer & Full-Stack Developer',
    description:
      'AI Engineer and Full-Stack Developer specializing in bridging advanced AI research and production-ready web systems.',
    images: [
      {
        url: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'JiHwan Kim — AI Engineer & Full-Stack Developer',
      },
    ],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JiHwan Kim — AI Engineer & Full-Stack Developer',
    description:
      'AI Engineer and Full-Stack Developer specializing in bridging advanced AI research and production-ready web systems.',
    images: [`${BASE_URL}/images/og-image.png`],
    creator: '@pileuszu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Lovingu.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}

