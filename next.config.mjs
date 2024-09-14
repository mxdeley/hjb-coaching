import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.aceternity.com',
      'images.unsplash.com',
      'api.microlink.io',
      'ik.imagekit.io', // Microlink Image Preview
    ],
  },
  // Your Next.js config here
}

export default withPayload(nextConfig)
