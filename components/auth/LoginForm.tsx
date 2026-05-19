'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3D3350] text-gray-900"
          placeholder="example@email.com"
          dir="ltr"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          كلمة المرور
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3D3350] text-gray-900"
          placeholder="••••••••"
          dir="ltr"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-[#3D3350] hover:bg-[#5A4A6B] text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
      >
        {loading ? 'جارٍ التسجيل...' : 'تسجيل الدخول'}
      </button>
    </form>
  )
}
