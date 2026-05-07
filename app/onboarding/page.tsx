import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { countries } from '@/lib/countries'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome to Eibaa!</h2>
        <p className="text-gray-500 mb-6 text-center text-sm">
          Please complete your profile to continue.
        </p>

        <form action={completeOnboarding} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user.user_metadata?.full_name ?? ''}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              name="country"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
            >
              <option value="">Select country</option>
              {countries.map(c => (
                <option key={c.name} value={c.name}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex gap-2">
              <select
                name="phoneCode"
                className="w-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
              >
                {countries.map(c => (
                  <option key={c.name} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="7XXXXXXXX"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
              />
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <div className="flex gap-2">
              <select
                name="whatsappCode"
                className="w-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
              >
                {countries.map(c => (
                  <option key={c.name} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="whatsapp"
                placeholder="7XXXXXXXX"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
            <select
              name="maritalStatus"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3D3350]"
            >
              <option value="">Select status</option>
              <option value="SINGLE">Single</option>
              <option value="MARRIED">Married</option>
              <option value="DIVORCED">Divorced</option>
              <option value="ENGAGED">Engaged</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#3D3350] text-white py-2 px-4 rounded-md hover:bg-[#7C6B8A] transition-colors mt-2"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  )
}
