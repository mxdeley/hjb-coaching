import { ReactNode } from 'react'

type SuccessStoriesProps = {
  children: ReactNode
}

import Header from '@/components/header'

const SuccessStoriesLayout = ({ children }: SuccessStoriesProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default SuccessStoriesLayout
