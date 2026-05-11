import Image from "next/image"
import Link from "next/link"

export default function CourseCard({ course }: {
  course: {
    id: string
    title: string
    content?: string
    thumbnail?: string
    capacity?: number
    slug?: string
    enrollmentsCount?: number
  }
}) {
  const isFull = typeof course.capacity === 'number' &&
    typeof course.enrollmentsCount === 'number' &&
    course.enrollmentsCount >= course.capacity

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
          <div className="mb-3">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {isFull
                ? 'Full'
                : `${course.capacity} / ${course.enrollmentsCount ?? 0} enrolled`
              }
            </span>
          </div>
        )}

        <Link
          href={`/courses/${course.id}`}
          className="mt-auto bg-[#7C6B8A] hover:bg-[#5f5070] text-white font-semibold py-2 px-6 rounded-full transition-colors"
        >
          View Course
        </Link>
      </div>
    </article>
  )
}
