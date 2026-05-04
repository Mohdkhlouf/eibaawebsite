import { prisma } from "@/lib/prisma"
import CourseCard from "@/components/cards/CourseCard"

export default async function FeaturedCourses() {
  const featured = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  })

  if (!featured.length) return null

  return (
    <section className="container mx-auto py-12 px-6">
      <h2 className="text-[#3D3350] text-3xl font-bold mb-8 text-center">Featured Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
