import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const blog = await prisma.blog.findUnique({
    where: { id },
  })

  if (!blog) return notFound()

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {blog.thumbnail && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <h2 className="text-xl text-gray-500 mb-4">{blog.shortTitle}</h2>
      <p className="text-sm text-gray-400 mb-8">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  )
}
