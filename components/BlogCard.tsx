import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ blog }: { blog: any }) {
  return (

      <article className='flex flex-col items-center text-center border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white h-[400px]'>
        <div className='relative w-full h-48 shrink-0'>
          {blog.thumbnail && (
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="p-4 flex flex-col items-center flex-1 overflow-hidden">
          <h2 className="text-xl text-[#404060] font-bold mb-2 line-clamp-2">{blog.title}</h2>
        <h3 className="text-lg text-[#404060] mb-2 line-clamp-3">{blog.shortTitle.slice(0, 120)}</h3>
        <Link href={`/blogs/${blog.id}`}>
          <button className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Read more
          </button>
        </Link>
      </div>
      </article>

  )
}
