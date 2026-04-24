'use client'

import React from 'react'
import { Services } from '@/components/Services'
import { PodcastSection } from '@/components/PodcastSection'
import { InstagramPosts } from '@/components/InstagramPosts'
import { HeaderContent } from '@/components/HeaderContent'
import { FeaturedBlogs } from '@/components/BlogCard'

export default function HomePage() {
  return (
    <>
      <HeaderContent />

      <Services />

      <Blog />

      <PodcastSection />

      <InstagramPosts />
    </>
  )
}
