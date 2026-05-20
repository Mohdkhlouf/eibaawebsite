import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Tajawal } from 'next/font/google'
import Link from 'next/link'
import type { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'
import { prisma } from '@/lib/prisma'

const tajawal = Tajawal({ weight: ['400', '700'], subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'Register',
  description: 'إنشاء حساب جديد ',
}

export default async function RegisterPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/')

  const socialLinks = await prisma.socialMediaLink.findMany({ orderBy: { order: 'asc' } })

  return (
    <div lang="ar" dir="rtl" className={`flex flex-col min-h-screen ${tajawal.className}`}>
      <Header />
      <main className="flex-1 w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">إنشاء حساب جديد</h1>
            <p className="text-lg text-gray-600">انضم إلينا</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <RegisterForm />
            <div className="mt-6 text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                هل لديك حساب بالفعل؟{' '}
                <Link href="/login" className="font-semibold text-[#3D3350] hover:text-[#5A4A6B] transition-colors">
                  دخول
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>بيانات حسابك محمية وآمنة تماماً</p>
          </div>
        </div>
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  )
}
