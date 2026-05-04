import Image from "next/image"
import Link from "next/link"

export default async function CourseCard({ course }: { course: { id: string; title: string; content?: string; thumbnail?: string; capacity?: number; slug?: string } }) {
  return (
    <article className="bg-white border border-[#F2C4A0] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {course.thumbnail && (
        <div className="relative w-62.5 h-62.5 mx-auto mt-4 rounded-lg overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="250px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col p-4 text-center flex-1">
        <h3 className="text-xl text-[#404060] font-bold mb-2">{course.title}</h3>
        {typeof course.capacity === 'number' && (
          <p className="text-lg text-[#404060] mb-2">Capacity: {course.capacity}</p>
        )}
        <Link href={`/courses/${course.id}`} className="mt-auto bg-[#7C6B8A] hover:bg-[#5f5070] text-white font-semibold py-2 px-6 rounded-full transition-colors">
          View course
        </Link>
      </div>
    </article>
  )
}
