'use client'

import React, { useEffect, useState } from 'react'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'

export function Feedback() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  )
}

const testimonials = [
  {
    quote:
      "I was a typical skinny college kid who couldn't gain weight. My trainer's custom bulking program and nutrition advice helped me pack on 20 pounds of muscle in just 4 months. I finally feel confident taking my shirt off at the beach!",
    name: 'Alex Chen, 19',
    title: 'Gained 20 pounds of muscle',
  },
  {
    quote:
      "After a sports injury in high school, I thought my athletic days were over. This trainer not only helped me recover but got me in the best shape of my life. I'm now outperforming my pre-injury self on the field!",
    name: 'Marcus Johnson, 22',
    title: 'Overcame injury, improved performance',
  },
  {
    quote:
      "I've struggled with my weight since I was a kid. This trainer's approach to fitness and nutrition finally clicked for me. I've lost 50 pounds, and for the first time in my life, I actually enjoy working out. Total life-changer!",
    name: 'Chris Rodriguez, 24',
    title: 'Lost 50 pounds, gained a new lifestyle',
  },
]
