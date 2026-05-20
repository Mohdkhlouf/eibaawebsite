import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        enrollements: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    const coursesWithCount = courses.map(course => ({
      ...course,
      enrollmentsCount: course.enrollements.length,
      enrollements: undefined
    }))
    return NextResponse.json(coursesWithCount)
  } catch (error) {
    console.error('[COURSES_GET]', error)
    return NextResponse.json(
      { message: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    })
    if (adminUser?.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden: Only admins can create courses' },
        { status: 403 }
      )
    }
    const body = await request.json()
    const { title, slug, content, thumbnail, capacity } = body
    if (!title || !slug || !content || !thumbnail || capacity === undefined || capacity === null) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }
    if (typeof capacity !== 'number' || capacity <= 0) {
      return NextResponse.json(
        { message: 'Capacity must be a positive number' },
        { status: 400 }
      )
    }
    const existingTitle = await prisma.course.findUnique({
      where: { title }
    })
    if (existingTitle) {
      return NextResponse.json(
        { message: 'Course with this title already exists' },
        { status: 409 }
      )
    }
    const existingSlug = await prisma.course.findUnique({
      where: { slug }
    })
    if (existingSlug) {
      return NextResponse.json(
        { message: 'Course with this slug already exists' },
        { status: 409 }
      )
    }
    const course = await prisma.course.create({
      data: {
        title,
        slug,
        content,
        thumbnail,
        capacity,
      },
      include: {
        enrollements: {
          select: {
            id: true
          }
        }
      }
    })
    const courseWithCount = {
      ...course,
      enrollmentsCount: course.enrollements.length,
      enrollements: undefined
    }
    return NextResponse.json(courseWithCount, { status: 201 })
  } catch (error) {
    console.error('[COURSES_POST]', error)
    return NextResponse.json(
      { message: 'Failed to create course' },
      { status: 500 }
    )
  }
}
