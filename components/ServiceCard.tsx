import Image from "next/image"
import Link from "next/link"
export default async function ServiceCard({ service }: { service: { id: string;  title: string; content: string; thumbnail: string; shortDesc: string; slug: string } }) {
  return (
    <article className='flex flex-col items-center border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white'>
      {service.thumbnail && (
        <div className="relative w-[250px] h-[250px] mx-auto mt-4 rounded-lg overflow-hidden">
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            sizes="250px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col p-4 text-center flex-1">
        <h3 className="text-xl text-[#404060] font-bold mb-2">{service.title}</h3>
        <p className="text-lg text-[#404060] mb-2">{service.shortDesc.slice(0, 150)}</p>
        <Link href={`/services/${service.id}`} className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Read more
        </Link>

      </div>
    </article>
  )
}
