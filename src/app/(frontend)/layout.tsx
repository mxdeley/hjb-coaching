import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'
import Header from '@/components/header'
import { FathomAnalytics } from './fathom'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body className={cn('min-h-screen  font-sans antialiased', fontSans.variable)}>
        <FathomAnalytics />

        <Header />
        {children}
      </body>
    </html>
  )
}

export default Layout
