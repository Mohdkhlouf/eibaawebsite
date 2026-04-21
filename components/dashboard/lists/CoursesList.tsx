'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  slug: string
  capacity: number
  enrollments: { id: string }[]
  createdAt: Date
  updatedAt: Date
}

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (!response.ok) throw new Error('Failed to fetch courses')
      const data = await response.json()
      setCourses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      const response = await fetch(`/api/courses/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete course')
      setCourses(courses.filter(course => course.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete course')
    }
  }

  if (loading) return <div className="text-center py-12">Loading courses...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
        <Link
          href="/dashboard?section=courses&action=add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Course
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Enrolled</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{course.slug}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{course.capacity}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    {course.enrollments?.length || 0} / {course.capacity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Link
                    href={`/dashboard?section=courses&action=edit&id=${course.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">No courses found. Create your first course!</p>
        </div>
      )}
    </div>
  )
}
