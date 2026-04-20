// app/(public)/[lang]/login/page.tsx
'use client'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={signInWithGoogle}>
        Continue with Google
      </button>
    </div>
  )
}
