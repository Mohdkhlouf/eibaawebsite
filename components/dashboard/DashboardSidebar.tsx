export function DashboardSidebar() {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <nav className="flex-1 px-4 py-6 space-y-1">
        <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
          Overview
        </a>
        <a href="/dashboard/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
          Projects
        </a>
        <a href="/dashboard/events" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
          Events
        </a>
      </nav>
    </aside>
  )
}
