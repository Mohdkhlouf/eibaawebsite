import type { ReactNode } from 'react'
import { Footer } from '@/components/ui/Footer'
import '../globals.css'
import Header from '@/components/ui/Header'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Tajawal } from 'next/font/google'

const tajawal = Tajawal({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eibaa Abutaha Website',
  description: 'إباء أبو طه',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const profile = await prisma.user.findUnique({ where: { id: user.id } })
    if (!profile?.profileCompleted) {
      redirect('/onboarding')
    }
  }

  return (
    <div lang="ar" dir="rtl" className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mx-auto w-full tajawal.className">
        {children}
      </main>
      <Footer />
    </div>
  )
}
