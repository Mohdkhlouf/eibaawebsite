// app/blogs/page.tsx
import { prisma } from '@/lib/prisma' // adjust path to wherever your file is
import BlogCard from '@/components/BlogCard'

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })

  if (!blogs.length) return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <p className="text-gray-600">no blogs</p>
    </div>
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
