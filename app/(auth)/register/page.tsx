'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const supabase = createClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const { error } = await supabase.auth.signUp({
      email: form.get('email') as string,
      password: form.get('password') as string,
      options: {
        data: { name: form.get('name') as string }, // stored in auth.users.raw_user_meta_data
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    })

    if (error) return setError(error.message)
    router.push('/register/confirm') // "check your email" page
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Full name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  )
}
