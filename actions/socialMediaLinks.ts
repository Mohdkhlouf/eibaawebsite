'use server'

import { prisma } from "@/lib/prisma"
import { SocialMediaLink, SocialMediaLinkSchema } from "@/lib/types/socialMedia"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteSocialMediaLink(id: string | number) {
  if (!id) throw new Error('Invalid id')
  await prisma.socialMediaLink.delete({ where: { id: Number(id) } })
  revalidatePath('/dashboard')
}

export async function getSocialMediaLinkById(id: string) {
  return await prisma.socialMediaLink.findUnique({ where: { id: parseInt(id) } })
}

export async function createSocialMediaLink(data: SocialMediaLink) {
  await prisma.socialMediaLink.create({ data })
  revalidatePath('/dashboard')
}

export async function updateSocialMediaLink(id: string, data: SocialMediaLink) {
  await prisma.socialMediaLink.update({ where: { id: parseInt(id) }, data })
  revalidatePath('/dashboard')
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
