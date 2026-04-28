import { prisma } from "@/lib/prisma"
import ServiceCard from "@/components/cards/ServiceCard"

export default async function FeaturedServices() {
  const featuredServices = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4
  })

  if (!featuredServices.length) return null

  return (
    <section className="container mx-auto py-12  px-6">
      <h2 className="text-[#3D3350] text-3xl font-bold mb-8 text-center">Featured Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
