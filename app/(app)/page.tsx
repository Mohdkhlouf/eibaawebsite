import FeaturedServices from "@/components/FeaturedServices"
import { PodcastSection } from '@/components/PodcastSection'
import { InstagramPosts } from '@/components/InstagramPosts'
import { HeaderContent } from '@/components/HeaderContent'
import FeaturedBlogs from '@/components/FeaturedBlogs'

export default function HomePage() {
  return (
    <>
      <HeaderContent />

      <FeaturedServices />

      <FeaturedBlogs />

      <PodcastSection />

      <InstagramPosts />
    </>
  )
}
