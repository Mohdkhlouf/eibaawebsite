import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ blog }: { blog: any }) {
  return (

    <article className="bg-white border border-[#E8D5F0] rounded-2xl shadow-sm hover:shadow-md transition-shadow">        <div className='relative w-full h-48 shrink-0'>
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
        <Link href={`/blogs/${blog.id}`} className="bg-[#7C6B8A] hover:bg-[#5f5070] text-white font-semibold py-2 px-6 rounded-full transition-colors">
            Read more
        </Link>
      </div>
      </article>

  )
}
