import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET single blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const blog = await prisma.blog.findUnique({
      where: { id },
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

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('[BLOG_GET]', error)
    return NextResponse.json(
      { message: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT update blog
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

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      include: { author: true }
    })

    if (!existingBlog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      )
    }

    // Check authorization (only author or admin can edit)
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (existingBlog.authorId !== user.id && currentUser?.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden: You can only edit your own blogs' },
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

    // Check if new slug already exists (but allow if it's the same blog)
    if (slug !== existingBlog.slug) {
      const duplicateSlug = await prisma.blog.findUnique({
        where: { slug }
      })

      if (duplicateSlug) {
        return NextResponse.json(
          { message: 'Blog with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        shortTitle,
        slug,
        content,
        categoryId,
        thumbnail,
        published,
        updatedAt: new Date(),
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

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error('[BLOG_PUT]', error)
    return NextResponse.json(
      { message: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE blog
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

    // Check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { author: true }
    })

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      )
    }

    // Check authorization (only author or admin can delete)
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (blog.authorId !== user.id && currentUser?.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden: You can only delete your own blogs' },
        { status: 403 }
      )
    }

    await prisma.blog.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('[BLOG_DELETE]', error)
    return NextResponse.json(
      { message: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
