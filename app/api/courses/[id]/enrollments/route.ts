import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const adminUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (adminUser?.role !== 'SUPER_ADMIN') return NextResponse.json({ message: 'Forbidden' }, { status: 403 })

  const { id } = await params

  const enrollments = await prisma.enrollement.findMany({
    where: { courseId: id },
    include: {
      user: {
        select: {
          id: true, name: true, email: true,
          phone: true, whatsapp: true, country: true, gender: true,
        }
      }
    },
    orderBy: { enrolledAt: 'desc' }
  })

  return NextResponse.json(enrollments)
}
