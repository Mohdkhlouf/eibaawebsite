import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Enroll from '@/components/ui/Enroll'
import LoginNow from '@/components/ui/LoginNow'

import { createClient } from '@/lib/supabase/server'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()


  const { id } = await params
  const course = await prisma.course.findUnique({
    where: { id },
  })

  if (!course) return notFound()

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
      <p className="text-sm text-gray-400 mb-8">
        {new Date(course.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: course.content }}
      />
      <div>
        {user ? <Enroll />: <LoginNow />}
      </div>
    </div>
  )
}
