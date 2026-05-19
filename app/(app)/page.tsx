import { PodcastSection } from '@/components/featuredSections/PodcastSection'
import InstagramPosts  from '@/components/featuredSections/InstagramPosts'
import { HeaderContent } from '@/components/ui/HeaderContent'
import FeaturedBlogs from '@/components/featuredSections/FeaturedBlogs'
import FeaturedServices from "@/components/featuredSections/FeaturedServices"
import FeaturedCourses from "@/components/featuredSections/FeaturedCourses"
import { prisma } from '@/lib/prisma'

export default async function HomePage() {

  const socialLinks = await prisma.socialMediaLink.findMany({ orderBy: { order: 'asc' } })

  return (
    <>
      <HeaderContent socialLinks={socialLinks}/>
      <FeaturedServices />
      <FeaturedCourses />
      <FeaturedBlogs />
      <PodcastSection />
      <InstagramPosts />
    </>
  )
}
