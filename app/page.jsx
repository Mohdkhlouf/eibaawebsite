'use client'

import React from 'react'
import { Services } from './components/Services'
import { PodcastSection } from './components/PodcastSection'
import { InstagramPosts } from './components/InstagramPosts'
import { HeaderContent } from './components/HeaderContent'
import { Blog } from './components/Blog'



const homePage = () => {

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

export default homePage