import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default function DashboardPage() {
  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {/* content */}
      </main>
    </div>
  )
}
