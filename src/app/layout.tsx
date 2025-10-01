import type { Metadata } from 'next'
import { Inter, Roboto, Open_Sans } from 'next/font/google'
import '@/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto'
})
const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans'
})

export const metadata: Metadata = {
  title: '포트폴리오 - 개발자',
  description: '창의적인 웹 개발자의 포트폴리오',
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
      <body className={`${inter.className} ${roboto.variable} ${openSans.variable}`}>
        {children}
      </body>
    </html>
  )
}

