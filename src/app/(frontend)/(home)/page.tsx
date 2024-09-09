import About from './_components/about'
import { Feedback } from './_components/feedback'
import { Gallery } from './_components/gallery'
import Hero from './_components/hero'
import { Sections } from './_components/sections'
import { Video } from './_components/video'

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col">
      <Hero />
      <About />
      <Video />
      <Sections />
      <Gallery />
      <Feedback />
    </main>
  )
}
