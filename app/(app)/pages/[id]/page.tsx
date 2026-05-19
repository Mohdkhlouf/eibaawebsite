import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
export default async function StaticPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const page = await prisma.staticPage.findUnique({
    where: { id },
  })
  if (!page) return notFound()
  return (
    <div className="container flex-col mx-auto py-8 max-w-3xl px-4">
      <h1 className="text-4xl font-bold mb-2">{page.title}</h1>
      <p className="text-sm text-gray-400 mb-8">
        {new Date(page.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  )
}
