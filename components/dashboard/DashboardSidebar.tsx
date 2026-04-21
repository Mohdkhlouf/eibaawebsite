'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function DashboardSidebar() {
  const searchParams = useSearchParams()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    blogs: true,
    categories: true,
    courses: true,
    users: true,
  })

  const currentSection = searchParams.get('section')
  const currentAction = searchParams.get('action')

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const menuSections = [
    {
      title: 'Blogs',
      key: 'blogs',
      items: [
        { label: 'Show All', action: 'all' },
        { label: 'Add New', action: 'add' }
      ]
    },
    {
      title: 'Categories',
      key: 'categories',
      items: [
        { label: 'Show All', action: 'all' },
        { label: 'Add New', action: 'add' }
      ]
    },
    {
      title: 'Courses',
      key: 'courses',
      items: [
        { label: 'Show All', action: 'all' },
        { label: 'Add New', action: 'add' }
      ]
    },
    {
      title: 'Users',
      key: 'users',
      items: [
        { label: 'Show All', action: 'all' },
        { label: 'Add New', action: 'add' }
      ]
    }
  ]

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            !currentSection
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          📊 Overview
        </Link>

        {menuSections.map(section => (
          <div key={section.key} className="space-y-3">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-2xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span>{section.title}</span>
              <span className={`text-gray-400 transition-transform duration-200 inline-block ${expandedSections[section.key] ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSections[section.key] && (
              <div className="pl-4 space-y-1 border-l border-gray-200">
                {section.items.map(item => (
                  <Link
                    key={item.action}
                    href={`/dashboard?section=${section.key}&action=${item.action}`}
                    className={`block px-3 py-2 rounded-lg text-lg transition-colors ${
                      currentSection === section.key && currentAction === item.action
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
