import { ReactNode } from 'react'

type BlogProps = {
  children: ReactNode
}

import Header from '@/components/header'

const BlogLayout = ({ children }: BlogProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default BlogLayout
