import HeroVideoDialog from '@/components/ui/hero-video-dialog'

export function Video() {
  return (
    <div className="relative max-w-6xl mx-auto">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="/gym-video.mp4"
        thumbnailSrc="/video-hero.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="/gym-video.mp4"
        thumbnailSrc="/video-hero.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  )
}
