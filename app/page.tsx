'use client'

import React from 'react'
import { Services } from '@/components/Services'
import { PodcastSection } from '@/components/PodcastSection'
import { InstagramPosts } from '@/components/InstagramPosts'
import { HeaderContent } from '@/components/HeaderContent'
import { Blog } from '@/components/Blog'

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
