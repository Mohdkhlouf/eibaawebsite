import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('[BLOGS_GET]', error)
    return NextResponse.json(
      { message: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST create new blog
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
        { message: 'Forbidden: Only admins can create blogs' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, shortTitle, slug, content, categoryId, thumbnail, published } = body

    // Validate required fields
    if (!title || !shortTitle || !slug || !content || !categoryId || !thumbnail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug }
    })

    if (existingBlog) {
      return NextResponse.json(
        { message: 'Blog with this slug already exists' },
        { status: 409 }
      )
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        shortTitle,
        slug,
        content,
        categoryId,
        thumbnail,
        published: published || false,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        category: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('[BLOGS_POST]', error)
    return NextResponse.json(
      { message: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
