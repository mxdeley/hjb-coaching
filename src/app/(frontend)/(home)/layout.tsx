import { Inter as FontSans } from 'next/font/google'
import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

import Header from '@/components/header'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
