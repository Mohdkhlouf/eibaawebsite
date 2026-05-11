import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, enrollmentId: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const adminUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (adminUser?.role !== 'SUPER_ADMIN') return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

  const { enrollmentId } = await params

  await prisma.enrollement.delete({ where: { id: enrollmentId } })

  return NextResponse.json({ message: 'Enrollment removed' })
}
