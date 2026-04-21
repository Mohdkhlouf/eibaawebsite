import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isDashboardLogin = pathname === '/dashboardLogin'
  const isNormalLogin = pathname === '/login'

  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isDashboardRoute && !isDashboardLogin && !user) {
    return NextResponse.redirect(new URL('/dashboardLogin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
