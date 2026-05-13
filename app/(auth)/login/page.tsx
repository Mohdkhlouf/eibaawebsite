import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Tajawal } from 'next/font/google'
import Link from 'next/link'
import '@/app/globals.css'
import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

const tajawal = Tajawal({
  weight: ['400', '700'],
  subsets: ['arabic']
})

export const metadata: Metadata = {
  title: 'تسجيل الدخول - Eibaa',
  description: 'تسجيل الدخول إلى حسابك في إباء',
}

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div lang="ar" dir="rtl" className={`flex flex-col min-h-screen ${tajawal.className}`}>
      <Header />
      <main className="flex-1 w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">مرحباً بك</h1>
            <p className="text-lg text-gray-600">
              قم بتسجيل الدخول إلى حسابك في إباء
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <LoginForm />

            {/* Signup Link */}
            <div className="mt-6 text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                ليس لديك حساب؟{' '}
                <Link href="/register" className="font-semibold text-[#3D3350] hover:text-[#5A4A6B] transition-colors">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>بيانات حسابك محمية وآمنة تماماً</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
