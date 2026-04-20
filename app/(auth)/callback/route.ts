// app/auth/callback/route.ts
import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) return NextResponse.redirect(`${origin}/en/login`)

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/en/login`)
  }

  const { id, email, user_metadata } = data.user

  // upsert into your Prisma users table
  await prisma.user.upsert({
    where: { id },
    update: {},
    create: {
      id,
      email: email!,
      name: user_metadata?.full_name ?? null,
      avatarUrl: user_metadata?.avatar_url ?? null,
      role: 'USER', // default role
    }
  })

  return NextResponse.redirect(`${origin}/dashboard`)
}
