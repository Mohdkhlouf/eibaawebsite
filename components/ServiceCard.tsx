import Image from "next/image"

export default async function ServiceCard({ service }: { service: { title: string; content: string; thumbnail: string; shortDesc: string; slug: string } }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <article className='flex flex-col border rounded-lg  shadow-md overflow-hidden hover:shadow-md transition-shadow'>
      {service.thumbnail && (
        <div className="relative w-full h-48">
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col p-4 text-center flex-1">
        <h3 className="text-xl text-[#404060] font-bold mb-2">{service.title}</h3>
        <p className="text-lg text-[#404060]  mb-2">{service.shortDesc}</p>
        <p className="text-gray-600 mb-4">{service.content}</p>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Read more
        </button>
      </div>
      </article>
      </div>
  )
}
