
import { PodcastSection } from '@/components/featuredSections/PodcastSection'
import InstagramPosts  from '@/components/featuredSections/InstagramPosts'
import { HeaderContent } from '@/components/ui/HeaderContent'
import FeaturedBlogs from '@/components/featuredSections/FeaturedBlogs'
import FeaturedServices from "@/components/featuredSections/FeaturedServices"
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
