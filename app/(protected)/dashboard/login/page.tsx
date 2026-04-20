'use client'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)

    const { error } = await supabase.auth.signInWithPassword({
      email: form.get('email') as string,
      password: form.get('password') as string,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const res = await fetch('/api/me')
    const user = await res.json()

    if (user.role !== 'SUPER_ADMIN') {
      await supabase.auth.signOut()
      setError('Access denied.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
