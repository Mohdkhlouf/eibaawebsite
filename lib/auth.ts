
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getUser(): Promise<import('@supabase/supabase-js').User | null> {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // Cookies can only be set in Server Actions or Route Handlers
            // This error is safe to ignore during server-side rendering
          }
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  return user // null if not logged in
}
