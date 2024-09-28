'use client'
import { ParallaxScroll } from '@/components/ui/parallax-scroll'

export function Gallery() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-white mb-10">Client Success</h1>
      <ParallaxScroll images={images} className="h-screen w-screen" />
    </div>
  )
}

const images = [
  'https://ik.imagekit.io/danielcmadeley/hjb-coaching/Before1.webp?updatedAt=1727541963737',
  'https://ik.imagekit.io/danielcmadeley/hjb-coaching/After1.webp?updatedAt=1727541982059',
  'https://ik.imagekit.io/danielcmadeley/hjb-coaching/Before2.webp?updatedAt=1727541998341',
  'https://ik.imagekit.io/danielcmadeley/hjb-coaching/After2.webp?updatedAt=1727542014197',
  'https://ik.imagekit.io/danielcmadeley/hjb-coaching/Before3.webp?updatedAt=1727542031380',
  'https://ik.imagekit.io/danielcmadeley/hjb-coaching/After3.webp?updatedAt=1727542045581',
]
