import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET single course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const course = await prisma.courses.findUnique({
      where: { id },
      include: {
        enrollements: {
          select: { id: true }
        }
      }
    })

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...course,
      enrollmentsCount: course.enrollements.length,
      enrollements: undefined
    })
  } catch (error) {
    console.error('[COURSE_GET]', error)
    return NextResponse.json(
      { message: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

// PUT update course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check authentication
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (adminUser?.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden: Only admins can update courses' },
        { status: 403 }
      )
    }

    // Check if course exists
    const existingCourse = await prisma.courses.findUnique({
      where: { id }
    })

    if (!existingCourse) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, slug, content, thumbnail, capacity } = body

    // Validate required fields
    if (!title || !slug || !content || !thumbnail || capacity === undefined || capacity === null) {
      return NextResponse.json(
        { message: 'Missing required fields: title, slug, content, thumbnail, capacity' },
        { status: 400 }
      )
    }

    // Validate capacity is a positive number
    if (typeof capacity !== 'number' || capacity <= 0) {
      return NextResponse.json(
        { message: 'Capacity must be a positive number' },
        { status: 400 }
      )
    }

    // Check if new title already exists (but allow if it's the same course)
    if (title !== existingCourse.title) {
      const duplicateTitle = await prisma.courses.findUnique({
        where: { title }
      })

      if (duplicateTitle) {
        return NextResponse.json(
          { message: 'Course with this title already exists' },
          { status: 409 }
        )
      }
    }

    // Check if new slug already exists (but allow if it's the same course)
    if (slug !== existingCourse.slug) {
      const duplicateSlug = await prisma.courses.findUnique({
        where: { slug }
      })

      if (duplicateSlug) {
        return NextResponse.json(
          { message: 'Course with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updatedCourse = await prisma.courses.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        thumbnail,
        capacity,
        updatedAt: new Date(),
      },
      include: {
        enrollements: {
          select: { id: true }
        }
      }
    })

    return NextResponse.json({
      ...updatedCourse,
      enrollmentsCount: updatedCourse.enrollements.length,
      enrollements: undefined
    })
  } catch (error) {
    console.error('[COURSE_PUT]', error)
    return NextResponse.json(
      { message: 'Failed to update course' },
      { status: 500 }
    )
  }
}

// DELETE course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check authentication
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (adminUser?.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden: Only admins can delete courses' },
        { status: 403 }
      )
    }

    // Check if course exists
    const course = await prisma.courses.findUnique({
      where: { id }
    })

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    await prisma.courses.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('[COURSE_DELETE]', error)
    return NextResponse.json(
      { message: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
