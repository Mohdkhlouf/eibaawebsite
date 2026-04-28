import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const service = await prisma.service.findUnique({
    where: { id },
  })

  if (!service) return notFound()

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {service.thumbnail && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            sizes='250px'
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
      <h2 className="text-xl text-gray-500 mb-4">{service.shortDesc}</h2>
      <p className="text-sm text-gray-400 mb-8">
        {new Date(service.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: service.content }}
      />
    </div>
  )
}
