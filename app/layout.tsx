import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import './globals.css'
import { type ReactNode } from 'react'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-neutral-100 flex flex-col gap-[2vmax] justify-stretch p-[2vmax] text-black">
        <NavBar />
        <main className="min-h-screen flex flex-col grow">{children}</main>
      </body>
    </html>
  )
}
