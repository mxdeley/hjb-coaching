'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { LinkPreview } from '@/components/ui/link-preview'
import Image from 'next/image'

export function About() {
  return (
    <div className="flex md:flex-row flex-col justify-between max-w-6xl mx-auto py-20 items-center">
      <div className="flex justify-center items-center h-[40rem] flex-col px-4">
        <p className="text-white text-xl md:text-3xl max-w-3xl mx-auto mb-10">
          Hi Guys, I&apos;m{' '}
          <LinkPreview
            url="https://www.instagram.com/harrison.bickford/"
            className="font-bold text-blue-600"
          >
            Harrison
          </LinkPreview>{' '}
          . I am an online fitness and transformation coach. I help people get in shape and stay in
          shape.
        </p>
        <p className="text-white text-xl md:text-3xl max-w-3xl mx-auto mb-10">
          Taking 3rd place out of 13 talented junior competitors in my first ever
          <LinkPreview
            url="https://drugfreebodybuilding.co.uk/"
            className="text-blue-600 font-bold"
          >
            {' '}
            Bodybuilding Comp!
          </LinkPreview>
        </p>
        <p className="text-white text-xl md:text-3xl max-w-3xl mx-auto ">
          BSc Sport and Exercise Science @
          <LinkPreview
            url="https://drugfreebodybuilding.co.uk/"
            className="text-blue-600 font-bold"
          >
            {' '}
            Loughborough University
          </LinkPreview>
        </p>
      </div>
      <div>
        <Image
          src="https://ik.imagekit.io/danielcmadeley/hjb-coaching/about-image.webp?updatedAt=1726311586190"
          alt="About"
          width={600}
          height={600}
          className="rounded-xl"
        />
      </div>
    </div>
  )
}
