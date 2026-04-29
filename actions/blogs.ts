'use server'
import { prisma } from '@/lib/prisma'
import { BlogFormData, blogSchema } from '@/lib/types/blog'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } })
  revalidatePath('/dashboard')
}

export async function createBlog(data: BlogFormData) {
  const parsed = blogSchema.parse(data)
  await prisma.blog.create({ data: parsed })
  redirect('/dashboard?section=blogs')
}

export async function updateBlog(id: string, data: BlogFormData) {
  const parsed = blogSchema.parse(data)
  await prisma.blog.update({ where: { id }, data: parsed })
  redirect('/dashboard?section=blogs')
}

export async function getBlog(id: string) {
  return prisma.blog.findUnique({
    where: { id },
    include: { author: true, category: true },
  })
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } })
}
