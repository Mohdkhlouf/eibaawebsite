import { prisma } from "@/lib/prisma"
import ServiceCard from "@/components/cards/ServiceCard"

export default async function servicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  })

  if (!services.length) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Services</h1>
        <p className="text-gray-600">no services</p>
      </div>
    )
  }


  return (
  <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-6">Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />

      ))}
      </div>
  </div>
  )
}
