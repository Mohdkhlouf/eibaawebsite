import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import EnrollButton from '@/components/ui/EnrollButton'
import LoginNow from '@/components/ui/LoginNow'
import { createClient } from '@/lib/supabase/server'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { id } = await params

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      enrollements: { select: { id: true } }
    }
  })


  if (!course) return notFound()

  const enrollmentsCount = course.enrollements.length
  const isFull = enrollmentsCount >= course.capacity

  const enrollment = user
    ? await prisma.enrollement.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: course.id } },
      })
    : null

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {course.thumbnail && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-sm text-gray-400 mb-2">
        {new Date(course.createdAt).toLocaleDateString()}
      </p>

      {/* Capacity indicator */}
      <div className="flex items-center gap-2 mb-8">
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          isFull
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {isFull ? 'Full' : `${course.capacity} / ${enrollmentsCount}  enrolled`}
        </span>
      </div>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: course.content }}
      />

      <div>
        {user
          ? <EnrollButton
              courseId={course.id}
              isEnrolled={!!enrollment}
              isLoggedIn={!!user}
              isFull={isFull}
            />
          : <LoginNow />
        }
      </div>
    </div>
  )
}
