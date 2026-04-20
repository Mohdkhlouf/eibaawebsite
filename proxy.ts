import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // unauthenticated → redirect to admin login
  if (!user && pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }

  // authenticated → check role via API
  if (user && pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    const res = await fetch(new URL('/api/me', request.url), {
      headers: { cookie: request.headers.get('cookie') ?? '' }
    })
    const data = await res.json()

    if (data.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*']
}
