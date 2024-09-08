import { ReactNode } from 'react'

type NutritionProps = {
  children: ReactNode
}

import Header from '@/components/header'

const NutritionLayout = ({ children }: NutritionProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default NutritionLayout
