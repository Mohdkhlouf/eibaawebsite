'use client'

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { useSearchParams } from 'next/navigation'

// Import list components
import BlogsList from '@/components/dashboard/lists/BlogsList'
import CategoriesList from '@/components/dashboard/lists/CategoriesList'
import CoursesList from '@/components/dashboard/lists/CoursesList'
import UsersList from '@/components/dashboard/lists/UsersList'

// Import form components
import BlogsForm from '@/components/dashboard/forms/BlogsForm'
import CategoriesForm from '@/components/dashboard/forms/CategoriesForm'
import CoursesForm from '@/components/dashboard/forms/CoursesForm'
import UsersForm from '@/components/dashboard/forms/UsersForm'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const section = searchParams.get('section')
  const action = searchParams.get('action')

  const renderContent = () => {
    switch (section) {
      case 'blogs':
        if (action === 'add') return <BlogsForm />
        if (action === 'edit') return <BlogsForm />
        return <BlogsList />

      case 'categories':
        return action === 'add' ? <CategoriesForm /> : <CategoriesList />

      case 'courses':
        return action === 'add' ? <CoursesForm /> : <CoursesList />

      case 'users':
        return action === 'add' ? <UsersForm /> : <UsersList />

      default:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Dashboard</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Select an option from the sidebar to get started</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-full w-full">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {renderContent()}
      </main>
    </div>
  )
}
