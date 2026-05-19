'use server'

import { prisma } from '@/lib/prisma'
import { userSchema, User } from '@/lib/types/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function updateUser(id: string, data: Partial<User>) {
  await prisma.user.update({ where: { id }, data })
  revalidatePath('/dashboard')
}

export async function deleteUserAction(id: string | number) {
  'use server'
  await prisma.user.delete({ where: { id: String(id) } })
  revalidatePath('/dashboard')
}

// server action wrapper for form
export async function updateUserAction(formData: FormData) {
  'use server'
  const id = formData.get('id')
  if (!id || typeof id !== 'string') throw new Error('Missing id')

  const email = formData.get('email')
  const name = formData.get('name')
  const role = formData.get('role')

  const payload = {
    email: typeof email === 'string' ? email : '',
    name: typeof name === 'string' ? name : '',
    role: (typeof role === 'string' && (role === 'USER' || role === 'SUPER_ADMIN')) ? role : 'USER',
  }

  const parsed = userSchema.safeParse(payload)
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))

  await prisma.user.update({ where: { id }, data: parsed.data })
  revalidatePath('/dashboard')
  redirect('/dashboard?section=users')
}
