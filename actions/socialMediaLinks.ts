'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteSocialMediaLink(id: number) {
  await prisma.socialMediaLink.delete({ where: { id } })
  revalidatePath('/dashboard')
}

export async function deleteSocialMediaLinkAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id) throw new Error('Invalid id')
  const nid = typeof id === 'string' ? Number(id) : Number(id)
  if (Number.isNaN(nid)) throw new Error('Invalid id')
  return deleteSocialMediaLink(nid)
}
