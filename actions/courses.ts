'use server'
import { prisma } from '@/lib/prisma'
import { courseSchema, Course } from '@/lib/types/course'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
export async function getCourses() {
  return prisma.course.findMany({ orderBy: { createdAt: 'desc' } })
}
export async function getCourseById(id: string) {
  return prisma.course.findUnique({ where: { id } })
}
export async function createCourse(data: Course) {
  await prisma.course.create({ data })
  revalidatePath('/dashboard')
}
export async function updateCourse(id: string, data: Course) {
  await prisma.course.update({ where: { id }, data })
  revalidatePath('/dashboard')
}
export async function deleteCourseAction(id: string | number) {
  'use server'
  await prisma.course.delete({ where: { id: String(id) } })
  revalidatePath('/dashboard')
}
export async function createCourseAction(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const slug = formData.get('slug')
  const content = formData.get('content')
  const thumbnail = formData.get('thumbnail')
  const capacity = formData.get('capacity')
  const payload = {
    title: typeof title === 'string' ? title : '',
    slug: typeof slug === 'string' ? slug : '',
    content: typeof content === 'string' ? content : '',
    thumbnail: typeof thumbnail === 'string' ? thumbnail : '',
    capacity: capacity ? parseInt(String(capacity)) : 0,
  }
  const parsed = courseSchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))
  await prisma.course.create({ data: parsed.data })
  revalidatePath('/dashboard')
  redirect('/dashboard?section=courses')
}
export async function updateCourseAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id || typeof id !== 'string') throw new Error('Missing id')
  const title = formData.get('title')
  const slug = formData.get('slug')
  const content = formData.get('content')
  const thumbnail = formData.get('thumbnail')
  const capacity = formData.get('capacity')
  const payload = {
    title: typeof title === 'string' ? title : '',
    slug: typeof slug === 'string' ? slug : '',
    content: typeof content === 'string' ? content : '',
    thumbnail: typeof thumbnail === 'string' ? thumbnail : '',
    capacity: capacity ? parseInt(String(capacity)) : 0,
  }
  const parsed = courseSchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))
  await prisma.course.update({ where: { id }, data: parsed.data })
  revalidatePath('/dashboard')
  redirect('/dashboard?section=courses')
}
