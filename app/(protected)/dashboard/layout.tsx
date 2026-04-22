import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { redirect } from 'next/navigation'
import './dashboard.css'
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

  if (!profile) {
    console.log("login note:", "you are not loggin in so login first please")
    redirect('/login')
  }

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
