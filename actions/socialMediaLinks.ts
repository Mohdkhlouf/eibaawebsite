'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteSocialMediaLink(id: number) {
  await prisma.socialMediaLink.delete({ where: { id } })
  revalidatePath('/dashboard')
}


export async function deleteSocialMediaLinkAction(id: number) {
  'use server'
  if (!id || Number.isNaN(id)) throw new Error('Invalid id')
  return deleteSocialMediaLink(id)
}
