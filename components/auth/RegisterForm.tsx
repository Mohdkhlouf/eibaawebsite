'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function RegisterForm() {
  const supabase = createClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    const password = form.get('password') as string
    const confirmPassword = form.get('confirmPassword') as string
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      setLoading(false)
      return
    }
    const { error } = await supabase.auth.signUp({
      email: form.get('email') as string,
      password,
      options: {
        data: { name: form.get('name') as string },
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/register/confirm')
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">الاسم الكامل *</label>
        <input name="name" type="text" placeholder="أدخل اسمك الكامل" required disabled={loading}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors disabled:bg-gray-100" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">البريد الإلكتروني *</label>
        <input name="email" type="email" placeholder="أدخل بريدك الإلكتروني" required disabled={loading}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors disabled:bg-gray-100" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">كلمة المرور *</label>
        <input name="password" type="password" placeholder="أدخل كلمة المرور" required disabled={loading}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors disabled:bg-gray-100" />
        <p className="text-xs text-gray-500 mt-1">يجب أن تكون قوية (8 أحرف على الأقل)</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">تأكيد كلمة المرور *</label>
        <input name="confirmPassword" type="password" placeholder="أعد إدخال كلمة المرور" required disabled={loading}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors disabled:bg-gray-100" />
      </div>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
          {error}
        </div>
      )}
      <button type="submit" disabled={loading}
        className="w-full bg-gradient-to-r from-[#3D3350] to-[#5A4A6B] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:from-[#2d254a] hover:to-[#4a3a5b] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
        {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
      </button>
    </form>
  )
}
