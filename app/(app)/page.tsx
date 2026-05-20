import { PodcastSection } from '@/components/featuredSections/PodcastSection'
import InstagramPosts  from '@/components/featuredSections/InstagramPosts'
import { HeaderContent } from '@/components/ui/HeaderContent'
import FeaturedBlogs from '@/components/featuredSections/FeaturedBlogs'
import FeaturedServices from "@/components/featuredSections/FeaturedServices"
import FeaturedCourses from "@/components/featuredSections/FeaturedCourses"
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'موقع الاخصائية الأسرية إباء أبو طه',
  description: 'أخصائية زواج وأسرة.. لأسرة سعيدة نابضة بالحب والحياة'
}

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
