import { prisma } from "@/lib/prisma"


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
    <div>
      {services.map(service => (
        <div>

          <h2>{service.title}</h2>
          <p>{service.shortDesc}</p>
          <p>{service.content }</p>
        </div>

      ))}
    </div>
  )
}
