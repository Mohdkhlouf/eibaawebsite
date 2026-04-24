// app/blogs/page.tsx
import { prisma } from '@/lib/prisma' // adjust path to wherever your file is
import Image from 'next/image'
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
        <article key={blog.id} className='flex flex-col justify-center items-center text-center border rounded-lg shadow-md overflow-hidden'>
          <div className='relative w-full h-48'>
            {blog.thumbnail && (
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="p-4 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <h3 className="text-lg font-semibold mb-2">{blog.shortTitle}</h3>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Read more
            </button>
          </div>
        </article>    ))}
      </div>
    </div>
  )
}
