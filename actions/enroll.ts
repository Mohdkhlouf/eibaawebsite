'use server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
export async function enrollInCourse(courseId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const existing = await prisma.enrollement.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  })
  if (existing) return { error: 'Already enrolled' }
  await prisma.enrollement.create({
    data: { userId: user.id, courseId },
  })
  return { success: true }
}
