import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { redirect } from 'next/navigation'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const profile = await prisma.user.findUnique({
    where: { id: user.id }
  })

  if (!profile) redirect('/login')

  return (
    <div className="flex flex-col h-screen">
      <div><DashboardHeader dashboardUser={profile} /></div>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {children}
      </div>
      <DashboardFooter />
    </div>
  )
}
