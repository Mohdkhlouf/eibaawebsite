'use server'

import { prisma } from '@/lib/prisma'
import { menuItemSchema, MenuItem } from '@/lib/types/menu'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getMenuItems() {
  return prisma.menuItem.findMany({ orderBy: { order: 'asc' } })
}

export async function getMenuItemById(id: string) {
  return prisma.menuItem.findUnique({ where: { id } })
}

export async function createMenuItem(data: MenuItem & { url?: string; pageId?: string }) {
  const finalData = {
    label: data.label,
    url: data.linkType === 'custom' ? data.url : null,
    pageId: data.linkType === 'page' ? data.pageId : null,
    order: data.order || 0,
  }
  await prisma.menuItem.create({ data: finalData })
  revalidatePath('/')
}

export async function updateMenuItem(id: string, data: MenuItem & { url?: string; pageId?: string }) {
  const finalData = {
    label: data.label,
    url: data.linkType === 'custom' ? data.url : null,
    pageId: data.linkType === 'page' ? data.pageId : null,
    order: data.order || 0,
  }
  await prisma.menuItem.update({ where: { id }, data: finalData })
  revalidatePath('/')
}

export async function deleteMenuItemAction(id: string | number) {
  'use server'
  await prisma.menuItem.delete({ where: { id: String(id) } })
  revalidatePath('/dashboard')
}

// server action wrapper for form
export async function createMenuItemAction(formData: FormData) {
  'use server'
  const label = formData.get('label')
  const linkType = formData.get('linkType')
  const url = formData.get('url')
  const pageId = formData.get('pageId')
  const order = formData.get('order')

  const payload = {
    label: typeof label === 'string' ? label : '',
    linkType: typeof linkType === 'string' ? linkType : 'custom',
    url: typeof url === 'string' ? url : undefined,
    pageId: typeof pageId === 'string' ? pageId : undefined,
    order: order ? parseInt(String(order)) : 0,
  }

  const parsed = menuItemSchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))

  const finalData = {
    label: parsed.data.label,
    url: parsed.data.linkType === 'custom' ? parsed.data.url : null,
    pageId: parsed.data.linkType === 'page' ? parsed.data.pageId : null,
    order: parsed.data.order || 0,
  }

  await prisma.menuItem.create({ data: finalData })
  revalidatePath('/')
  redirect('/dashboard?section=menu')
}

export async function updateMenuItemAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id || typeof id !== 'string') throw new Error('Missing id')

  const label = formData.get('label')
  const linkType = formData.get('linkType')
  const url = formData.get('url')
  const pageId = formData.get('pageId')
  const order = formData.get('order')

  const payload = {
    label: typeof label === 'string' ? label : '',
    linkType: typeof linkType === 'string' ? linkType : 'custom',
    url: typeof url === 'string' ? url : undefined,
    pageId: typeof pageId === 'string' ? pageId : undefined,
    order: order ? parseInt(String(order)) : 0,
  }

  const parsed = menuItemSchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))

  const finalData = {
    label: parsed.data.label,
    url: parsed.data.linkType === 'custom' ? parsed.data.url : null,
    pageId: parsed.data.linkType === 'page' ? parsed.data.pageId : null,
    order: parsed.data.order || 0,
  }

  await prisma.menuItem.update({ where: { id }, data: finalData })
  revalidatePath('/')
  redirect('/dashboard?section=menu')
}
