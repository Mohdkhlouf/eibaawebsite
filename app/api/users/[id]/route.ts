import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
const userSelect = {
  id: true,
  email: true,
  name: true,
  avatarUrl: true,
  role: true,
  createdAt: true,
  profileCompleted: true,
  gender: true,
  country: true,
  phone: true,
  whatsapp: true,
  dateOfBirth: true,
  maritalStatus: true,
}
async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  return prisma.user.findUnique({ where: { id: user.id } })
}
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    console.error('[USER_GET]', error)
    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 })
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const adminUser = await getAdminUser()
    if (!adminUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (adminUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Forbidden: Only admins can update users' }, { status: 403 })
    }
    const existingUser = await prisma.user.findUnique({ where: { id } })
    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    const body = await request.json()
    if (body.email !== undefined) {
      return NextResponse.json({ message: 'Email cannot be updated' }, { status: 400 })
    }
    const {
      name, avatarUrl, role,
      gender, country, phone, whatsapp, dateOfBirth, maritalStatus,
    } = body
    if (role && !['USER', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ message: 'Invalid role: must be USER or SUPER_ADMIN' }, { status: 400 })
    }
    const updateData: any = {}
    if (name !== undefined)          updateData.name = name
    if (avatarUrl !== undefined)     updateData.avatarUrl = avatarUrl
    if (role !== undefined)          updateData.role = role
    if (gender !== undefined)        updateData.gender = gender
    if (country !== undefined)       updateData.country = country
    if (phone !== undefined)         updateData.phone = phone
    if (whatsapp !== undefined)      updateData.whatsapp = whatsapp
    if (maritalStatus !== undefined) updateData.maritalStatus = maritalStatus
    if (dateOfBirth !== undefined)   updateData.dateOfBirth = new Date(dateOfBirth)
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: userSelect,
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('[USER_PUT]', error)
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 })
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const adminUser = await getAdminUser()
    if (!adminUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (adminUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Forbidden: Only admins can delete users' }, { status: 403 })
    }
    const targetUser = await prisma.user.findUnique({ where: { id } })
    if (!targetUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('[USER_DELETE]', error)
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 })
  }
}
