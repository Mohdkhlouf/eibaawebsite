import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET all users
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('[USERS_GET]', error)
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST create new user
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
        { message: 'Forbidden: Only admins can create users' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, name, avatarUrl, role } = body

    // Validate required fields
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { message: 'Missing or invalid required field: email' },
        { status: 400 }
      )
    }

    // Validate role if provided
    if (role && !['USER', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role: must be USER or SUPER_ADMIN' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim() }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    const newUser = await prisma.user.create({
      data: {
        email: email.trim(),
        name: name || null,
        avatarUrl: avatarUrl || null,
        role: role || 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('[USERS_POST]', error)
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    )
  }
}
