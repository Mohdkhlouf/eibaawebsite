import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isOnboardingRoute = pathname === '/onboarding'
  let response = NextResponse.next({
    request: { headers: request.headers },
  })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (isDashboardRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    const meRes = await fetch(new URL('/api/me', request.url), {
      headers: { cookie: request.headers.get('cookie') ?? '' },
    })
    const me = await meRes.json()
    if (!meRes.ok || me.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  if (user && !isOnboardingRoute) {
    const meRes = await fetch(new URL('/api/me', request.url), {
      headers: { cookie: request.headers.get('cookie') ?? '' },
    })
    const me = await meRes.json()
    if (meRes.ok && me.profileCompleted === false) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }
  return response
}
export const config = {
  matcher: ['/dashboard/:path*', '/((?!_next|api|login|onboarding|.*\\..*).*)'],
}
