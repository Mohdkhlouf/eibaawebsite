

import { prisma } from "@/lib/prisma"
import CourseCard from "@/components/cards/CourseCard"

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' }
  })

  if (!courses.length) return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <p className="text-gray-600">no courses</p>
    </div>
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
