'use server'

import { deleteCloudinaryImage } from '@/lib/cloudinary/cloudinary-admin'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { serviceSchema } from '@/lib/types/service'
import { revalidatePath } from 'next/cache'

// Server actions for Services
export async function getServices() {
  return prisma.service.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } })
}

export async function createService(data: unknown) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // only SUPER_ADMIN can create
  const current = await prisma.user.findUnique({ where: { id: user.id } })
  if (current?.role !== 'SUPER_ADMIN') throw new Error('Forbidden')

  const parsed = serviceSchema.safeParse(data)
  if (!parsed.success) throw parsed.error

  const { title, slug, shortDesc, content, thumbnail } = parsed.data

  const existing = await prisma.service.findUnique({ where: { slug } })
  if (existing) throw new Error('Service with this slug already exists')

  const service = await prisma.service.create({
    data: {
      title,
      slug,
      shortDesc,
      content,
      thumbnail,
      authorId: user.id,
    },
  })

  return service
}

export async function updateService(id: string, data: unknown) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const existing = await prisma.service.findUnique({ where: { id } })
  if (!existing) throw new Error('Service not found')

  const currentUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (existing.authorId !== user.id && currentUser?.role !== 'SUPER_ADMIN') throw new Error('Forbidden')

  const parsed = serviceSchema.safeParse(data)
  if (!parsed.success) throw parsed.error

  const { title, slug, shortDesc, content, thumbnail } = parsed.data

  if (slug !== existing.slug) {
    const dup = await prisma.service.findUnique({ where: { slug } })
    if (dup) throw new Error('Service with this slug already exists')
  }

  const updated = await prisma.service.update({
    where: { id },
    data: { title, slug, shortDesc, content, thumbnail, updatedAt: new Date() },
  })

  return updated
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const existing = await prisma.service.findUnique({ where: { id } })
  if (!existing) throw new Error('Service not found')

  const currentUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (existing.authorId !== user.id && currentUser?.role !== 'SUPER_ADMIN') throw new Error('Forbidden')

  // delete thumbnail from Cloudinary if present
  if (existing.thumbnail) {
    try {
      await deleteCloudinaryImage(existing.thumbnail)
    } catch (e) {
      console.error('[DELETE_SERVICE_IMAGE]', e)
    }
  }

  await prisma.service.delete({ where: { id } })

  try { revalidatePath('/dashboard') } catch (e) { /* ignore */ }

  return { success: true }
}

// Server action wrapper to use directly as form action
export async function deleteServiceAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id || typeof id !== 'string') throw new Error('Invalid id')
  return deleteService(id)
}
