import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { countries } from '@/lib/countries'
import Header from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import '../globals.css'
import { Tajawal } from 'next/font/google'
import type { Metadata } from 'next'

const tajawal = Tajawal({
  weight: ['400', '700'],
  subsets: ['arabic']
})

export const metadata: Metadata = {
  title: 'إكمال الملف الشخصي - Eibaa',
  description: 'أكمل ملفك الشخصي',
}

async function completeOnboarding(formData: FormData) {
  'use server'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name:          formData.get('name') as string,
      gender:        formData.get('gender') as 'MALE' | 'FEMALE',
      country:       formData.get('country') as string,
      whatsapp:      formData.get('whatsapp') as string,
      phone:         formData.get('phone') as string,
      dateOfBirth:   new Date(formData.get('dateOfBirth') as string),
      maritalStatus: formData.get('maritalStatus') as 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'ENGAGED',
      profileCompleted: true,
    },
  })

  redirect('/')
}

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Already completed — skip
  const profile = await prisma.user.findUnique({ where: { id: user.id } })
  if (profile?.profileCompleted) redirect('/')

  return (
    <div lang="ar" dir="rtl" className={`flex flex-col min-h-screen ${tajawal.className}`}>
      <Header />
      <main className="flex-1 w-full py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">أكمل ملفك الشخصي</h1>
            <p className="text-lg text-gray-600">
              نرحب بك في إباء! يرجى إكمال معلومات ملفك الشخصي لمتابعة الاستفادة من خدماتنا.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <form action={completeOnboarding} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">الاسم الكامل *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.user_metadata?.full_name ?? ''}
                  required
                  placeholder="أدخل اسمك الكامل"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">النوع *</label>
                <select
                  name="gender"
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors bg-white"
                >
                  <option value="">اختر النوع</option>
                  <option value="MALE">ذكر</option>
                  <option value="FEMALE">أنثى</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">الدولة *</label>
                <select
                  name="country"
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors bg-white"
                >
                  <option value="">اختر الدولة</option>
                  {countries.map(c => (
                    <option key={c.name} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">رقم الهاتف *</label>
                <div className="flex gap-2 flex-row-reverse">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="7XXXXXXXX"
                    className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors"
                  />
                  <select
                    name="phoneCode"
                    className="w-32 border-2 border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors bg-white"
                  >
                    {countries.map(c => (
                      <option key={c.name} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">رقم واتس آب *</label>
                <div className="flex gap-2 flex-row-reverse">
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="7XXXXXXXX"
                    className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors"
                  />
                  <select
                    name="whatsappCode"
                    className="w-32 border-2 border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors bg-white"
                  >
                    {countries.map(c => (
                      <option key={c.name} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">تاريخ الميلاد *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors"
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">الحالة الاجتماعية *</label>
                <select
                  name="maritalStatus"
                  required
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3D3350] focus:ring-1 focus:ring-[#3D3350] transition-colors bg-white"
                >
                  <option value="">اختر الحالة</option>
                  <option value="SINGLE">أعزب</option>
                  <option value="MARRIED">متزوج</option>
                  <option value="DIVORCED">مطلق</option>
                  <option value="ENGAGED">مخطوبة</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3D3350] to-[#5A4A6B] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:from-[#2d254a] hover:to-[#4a3a5b] transition-all duration-200 mt-8"
              >
                إكمال الملف الشخصي
              </button>
            </form>
          </div>

          {/* Info Message */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>جميع المعلومات التي تدخلها محمية وآمنة تماماً ولن تُشارك مع أطراف ثالثة</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
