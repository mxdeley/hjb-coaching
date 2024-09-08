import { ReactNode } from 'react'

type AboutProps = {
  children: ReactNode
}

import Header from '@/components/header'

const AboutLayout = ({ children }: AboutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default AboutLayout
