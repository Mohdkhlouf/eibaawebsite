import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const profile = await prisma.user.findUnique({
    where: { id: user!.id }
  })

  return <div>Welcome, {profile?.name}</div>
}
