import React from 'react'
import { getPayload } from 'payload'
import { Post } from '@/payload-types'
import payloadConfig from '@/payload.config'
import { cache } from 'react'

export const revalidate = 3600 // Revalidate every hour instead of every minute

const getPayloadInstance = cache(async () => {
  return await getPayload({
    config: payloadConfig,
  })
})

async function getPosts() {
  try {
    const payload = await getPayloadInstance()
    const posts = await payload.find({
      collection: 'posts',
      depth: 1, // Limit the depth of nested relationships
      limit: 10, // Limit the number of posts fetched
    })
    return posts.docs as Post[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

const Test = async () => {
  const posts = await getPosts()

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Test
