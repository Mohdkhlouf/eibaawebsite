'use server'

import { prisma } from '@/lib/prisma'
import { StaticPageSchema, StaticPage } from '@/lib/types/staticPage'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getStaticPages() {
  return prisma.staticPage.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getStaticPageById(id: string) {
  return prisma.staticPage.findUnique({ where: { id } })
}

export async function getStaticPageBySlug(slug: string) {
  return prisma.staticPage.findUnique({ where: { slug } })
}

export async function createStaticPage(data: StaticPage) {
  await prisma.staticPage.create({ data })
  revalidatePath('/')
}

export async function updateStaticPage(id: string, data: StaticPage) {
  await prisma.staticPage.update({ where: { id }, data })
  revalidatePath('/')
}

export async function deleteStaticPage(id: string) {
  await prisma.staticPage.delete({ where: { id } })
  revalidatePath('/')
}

// server action wrappers for forms
export async function createStaticPageAction(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const slug = formData.get('slug')
  const content = formData.get('content')

  const payload = {
    title: typeof title === 'string' ? title : '',
    slug: typeof slug === 'string' ? slug : '',
    content: typeof content === 'string' ? content : '',
  }

  const parsed = StaticPageSchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))

  await prisma.staticPage.create({ data: parsed.data })
  revalidatePath('/')
  redirect('/dashboard?section=pages')
}

export async function updateStaticPageAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id || typeof id !== 'string') throw new Error('Missing id')

  const title = formData.get('title')
  const slug = formData.get('slug')
  const content = formData.get('content')

  const payload = {
    title: typeof title === 'string' ? title : '',
    slug: typeof slug === 'string' ? slug : '',
    content: typeof content === 'string' ? content : '',
  }

  const parsed = StaticPageSchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))

  await prisma.staticPage.update({ where: { id }, data: parsed.data })
  revalidatePath('/')
  redirect('/dashboard?section=pages')
}
