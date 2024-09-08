import { ReactNode } from 'react'

type ProgrammesProps = {
  children: ReactNode
}

import Header from '@/components/header'

const ProgrammesLayout = ({ children }: ProgrammesProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default ProgrammesLayout
