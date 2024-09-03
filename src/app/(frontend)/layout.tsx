import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'
import Header from '@/components/header'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body className={cn('min-h-screen  font-sans antialiased', fontSans.variable)}>
        <Header />
        {children}
      </body>
    </html>
  )
}

export default Layout
