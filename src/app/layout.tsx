import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'Construction Company - Building Your Dreams',
  description: 'Professional construction services for residential and commercial projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
} 