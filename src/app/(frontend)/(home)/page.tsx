import { Gallery } from './_components/gallery'
import Hero from './_components/hero'
import { Sections } from './_components/sections'

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col">
      <Hero />
      <Sections />
      <Gallery />
    </main>
  )
}
