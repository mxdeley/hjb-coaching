import HeroVideoDialog from '@/components/ui/hero-video-dialog'

export function Video() {
  return (
    <div className="relative max-w-6xl mx-auto">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://ik.imagekit.io/danielcmadeley/hjb-coaching/gym-video.mp4?updatedAt=1726311360035"
        thumbnailSrc="https://ik.imagekit.io/danielcmadeley/hjb-coaching/video-hero.webp?updatedAt=1726311586118"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://ik.imagekit.io/danielcmadeley/hjb-coaching/gym-video.mp4?updatedAt=1726311360035"
        thumbnailSrc="https://ik.imagekit.io/danielcmadeley/hjb-coaching/video-hero.webp?updatedAt=1726311586118"
        thumbnailAlt="Hero Video"
      />
    </div>
  )
}
