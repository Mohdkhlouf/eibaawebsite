import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET all categories
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return NextResponse.json(
      { message: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
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
        { message: 'Forbidden: Only admins can create categories' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name }
    })

    if (existingCategory) {
      return NextResponse.json(
        { message: 'Category with this name already exists' },
        { status: 409 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('[CATEGORIES_POST]', error)
    return NextResponse.json(
      { message: 'Failed to create category' },
      { status: 500 }
    )
  }
}
