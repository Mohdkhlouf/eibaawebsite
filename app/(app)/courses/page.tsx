import { prisma } from "@/lib/prisma"
import CourseCard from "@/components/cards/CourseCard"

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      enrollements: { select: { id: true } }
    }
  })

  const coursesWithCount = courses.map(course => ({
    ...course,
    enrollmentsCount: course.enrollements.length,
  }))

  if (!coursesWithCount.length) return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <p className="text-gray-600">No courses yet</p>
    </div>
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {coursesWithCount.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
