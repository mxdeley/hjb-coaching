'use client'
import { Boxes } from '@/components/ui/background-boxes'

export function BookNow() {
  return (
    <div className="h-96 relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg max-w-7xl mx-auto">
      <div className="absolute inset-0 w-full h-full  z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="flex flex-col items-center gap-6 justify-center z-20">
        <h1 className="md:text-4xl text-xl text-white relative z-20">
          Ready to start your fitness journey now?
        </h1>
        <p className="text-center mt-2 text-neutral-300 relative z-20">
          Book your appointment now and start your journey to a healthier you!
        </p>
      </div>
    </div>
  )
}
