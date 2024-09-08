import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.aceternity.com', 'images.unsplash.com'],
  },
  // Your Next.js config here
}

export default withPayload(nextConfig)
