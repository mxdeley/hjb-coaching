import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="w-screen h-screen">
      <Image src="/hjb-hero.webp" alt="hero" fill className="object-cover" />
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-gray-800 to-transparent"></div>
      <div className="absolute top-1/4 left-[40%] text-white text-cente ">
        <h1 className="text-8xl font-bold">Overcome your insecurities</h1>{' '}
        <p className="text-2xl">
          Complete my quick questionnaire to determine your workout specific to your goals.
        </p>
        <Button size={'sm'} variant={'outline'} className="bg-gray-50 text-gray-800">
          <Link href="/get-started">Determine your Workout</Link>
        </Button>
      </div>
    </div>
  )
}

export default Hero
