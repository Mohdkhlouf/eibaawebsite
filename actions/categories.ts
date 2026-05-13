'use server'

import { prisma } from '@/lib/prisma'
import { categorySchema, Category } from '@/lib/types/category'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getCategories() {
  return prisma.category.findMany()
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } })
}

export async function createCategory(data: Category) {
  await prisma.category.create({ data })
  revalidatePath('/dashboard')
}

export async function updateCategory(id: string, data: Category) {
  await prisma.category.update({ where: { id }, data })
  revalidatePath('/dashboard')
}

export async function deleteCategoryAction(id: string | number) {
  'use server'
  await prisma.category.delete({ where: { id: String(id) } })
  revalidatePath('/dashboard')
}

// server action wrapper for form
export async function createCategoryAction(formData: FormData) {
  'use server'
  const name = formData.get('name')

  const payload = {
    name: typeof name === 'string' ? name : '',
  }

  const parsed = categorySchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))

  await prisma.category.create({ data: parsed.data })
  revalidatePath('/dashboard')
  redirect('/dashboard?section=categories')
}

export async function updateCategoryAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id || typeof id !== 'string') throw new Error('Missing id')

  const name = formData.get('name')

  const payload = {
    name: typeof name === 'string' ? name : '',
  }

  const parsed = categorySchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))

  await prisma.category.update({ where: { id }, data: parsed.data })
  revalidatePath('/dashboard')
  redirect('/dashboard?section=categories')
}
