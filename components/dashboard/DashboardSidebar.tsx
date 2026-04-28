'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const menuItems = [
  { label: 'Blogs', section: 'blogs' },
  { label: 'Services', section: 'services' },
  { label: 'Categories', section: 'categories' },
  { label: 'Courses', section: 'courses' },
  { label: 'Users', section: 'users' },
  { label: 'Socialmedia Links', section: 'socialMediaLinks' },
]

export function DashboardSidebar() {
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section')

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="px-4 py-6 space-y-1">
        {menuItems.map(item => (
          <Link
            key={item.section}
            href={`/dashboard?section=${item.section}`}
            className={`block px-3 py-2 rounded-lg text-lg transition-colors ${
              currentSection === item.section
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
