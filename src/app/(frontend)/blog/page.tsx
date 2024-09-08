import React from 'react'
import { Timeline } from '@/components/ui/timeline'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export default async function Blog() {
  const payload = await getPayloadHMR({
    config,
  })

  const posts = await payload.find({
    collection: 'posts', // This should match the slug in Posts.ts
  })

  const data = posts.docs.map((post) => ({
    title: <div className="text-white text-lg md:text-4xl font-bold">{post.title}</div>,
    content: (
      <div>
        <p className="text-white text-xs md:text-sm font-normal mb-8">{post.description}</p>
        {/* You can add more content here if needed */}
      </div>
    ),
  }))

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  )
}
