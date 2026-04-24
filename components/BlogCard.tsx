import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <Link href={`/blogs/${blog.id}`}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <article key={blog.id} className='flex flex-col justify-center items-center text-center border rounded-lg shadow-md overflow-hidden'>
      <div className='relative w-full h-48'>
        {blog.thumbnail && (
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-xl text-[#404060] font-bold mb-2">{blog.title}</h2>
        <h3 className="text-lg text-[#404060]  mb-2">{blog.shortTitle.slice(0,120)}</h3>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Read more
        </button>
      </div>
      </article>
      </div>
    </Link>
  )
}
