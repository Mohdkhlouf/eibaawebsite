import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Tajawal } from 'next/font/google'
import Header from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

const tajawal = Tajawal({
  weight: ['400', '700'],
  subsets: ['arabic']
})

export const metadata: Metadata = {
  title: 'أكمل ملفك الشخصي - Eibaa',
  description: 'أكمل ملف حسابك لتتمكن من الاستفادة من جميع الخدمات'
}

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const socialLinks = await prisma.socialMediaLink.findMany({ orderBy: { order: 'asc' } })

  return (
    <div lang="ar" dir="rtl" className={`flex flex-col min-h-screen ${tajawal.className}`}>
      <Header />
      <main className="flex-1 w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">أكمل ملفك الشخصي</h1>
            <p className="text-lg text-gray-600">
              ساعدنا لنتعرف عليك بشكل أفضل
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">الاسم الكامل *</label>
                <input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D3350] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">النوع *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D3350] transition">
                  <option>اختر النوع</option>
                  <option>ذكر</option>
                  <option>أنثى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">الدولة *</label>
                <input
                  type="text"
                  placeholder="أدخل اسم دولتك"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D3350] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  placeholder="أدخل رقم هاتفك"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D3350] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">رقم واتس آب *</label>
                <input
                  type="tel"
                  placeholder="أدخل رقم واتس آب"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D3350] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">تاريخ الميلاد *</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D3350] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">الحالة الاجتماعية *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D3350] transition">
                  <option>اختر الحالة</option>
                  <option>أعزب/عزباء</option>
                  <option>متزوج/متزوجة</option>
                  <option>مطلق/مطلقة</option>
                  <option>أرمل/أرملة</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3D3350] to-[#5A4A6B] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:from-[#2d254a] hover:to-[#4a3a5b] transition-all duration-200 mt-8"
              >
                إكمال الملف الشخصي
              </button>
            </form>
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
