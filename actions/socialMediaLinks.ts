'use server'

import { prisma } from "@/lib/prisma"
import { SocialMediaLink, SocialMediaLinkSchema } from "@/lib/types/socialMedia"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteSocialMediaLink(id: number | string) {
  const nid = typeof id === 'string' ? parseInt(id) : id
  if (!nid || Number.isNaN(Number(nid))) throw new Error('Invalid id')
  try {
    await prisma.socialMediaLink.delete({ where: { id: Number(nid) } })
    revalidatePath('/dashboard')
  } catch (e: any) {
    // handle missing table or record gracefully
    if (e?.code === 'P2021') throw new Error('Database table for social links not found. Run Prisma migrations.')
    if (e?.code === 'P2025') throw new Error('Social media link not found')
    throw e
  }
}

export async function getSocialMediaLinkById(id: string) {
  try {
    return await prisma.socialMediaLink.findUnique({ where: { id: parseInt(id) } })
  } catch (e: any) {
    if (e?.code === 'P2021') throw new Error('Database table for social links not found. Run Prisma migrations.')
    throw e
  }
}

export async function createSocialMediaLink(data: SocialMediaLink) {
  try {
    await prisma.socialMediaLink.create({ data })
    revalidatePath('/dashboard')
  } catch (e: any) {
    if (e?.code === 'P2021') throw new Error('Database table for social links not found. Run Prisma migrations.')
    if (e?.code === 'P2002') throw new Error('Order must be unique')
    throw e
  }
}

export async function updateSocialMediaLink(id: string, data: SocialMediaLink) {
  try {
    await prisma.socialMediaLink.update({ where: { id: parseInt(id) }, data })
    revalidatePath('/dashboard')
  } catch (e: any) {
    if (e?.code === 'P2021') throw new Error('Database table for social links not found. Run Prisma migrations.')
    if (e?.code === 'P2002') throw new Error('Order must be unique')
    if (e?.code === 'P2025') throw new Error('Social media link not found')
    throw e
  }
}

// Server action wrappers for forms
export async function createSocialMediaLinkAction(formData: FormData) {
  'use server'
  const name = formData.get('name')
  const url = formData.get('url')
  const icon = formData.get('icon')
  const order = formData.get('order')

  const payload = {
    name: typeof name === 'string' ? name : '',
    url: typeof url === 'string' ? url : '',
    icon: typeof icon === 'string' ? icon : '',
    order: typeof order === 'string' ? parseInt(order) : (typeof order === 'number' ? order : 0),
  }

  const parsed = SocialMediaLinkSchema.safeParse(payload)
  if (!parsed.success) {
    // collect error messages
    throw new Error(JSON.stringify(parsed.error.format()))
  }

  await prisma.socialMediaLink.create({ data: parsed.data })
  revalidatePath('/dashboard')
  // redirect back to social links list
  redirect('/dashboard?section=socialMediaLinks')
}

export async function updateSocialMediaLinkAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id || typeof id !== 'string') throw new Error('Missing id')

  const name = formData.get('name')
  const url = formData.get('url')
  const icon = formData.get('icon')
  const order = formData.get('order')

  const payload = {
    name: typeof name === 'string' ? name : '',
    url: typeof url === 'string' ? url : '',
    icon: typeof icon === 'string' ? icon : '',
    order: typeof order === 'string' ? parseInt(order) : (typeof order === 'number' ? order : 0),
  }

  const parsed = SocialMediaLinkSchema.safeParse(payload)
  if (!parsed.success) {
    throw new Error(JSON.stringify(parsed.error.format()))
  }

  await prisma.socialMediaLink.update({ where: { id: parseInt(id) }, data: parsed.data })
  revalidatePath('/dashboard')
  redirect('/dashboard?section=socialMediaLinks')
}
