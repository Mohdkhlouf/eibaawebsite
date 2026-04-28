// components/FeaturedBlogs.tsx
import { prisma } from '@/lib/prisma'
import BlogCard from '@/components/cards/BlogCard'

export default async function FeaturedBlogs() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  if (!blogs.length) return null

  return (
    <section className="container mx-auto  py-12  px-6">
      <h2 className="text-[#3D3350] text-3xl font-bold mb-8 text-center">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  )
}
