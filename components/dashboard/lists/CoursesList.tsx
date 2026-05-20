'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
interface Enrollment {
  id: string
  enrolledAt: string
  user: {
    id: string
    name: string | null
    email: string
    phone: string | null
    whatsapp: string | null
    country: string | null
    gender: string | null
    maritalStatus: string | null
  }
}
interface Course {
  id: string
  title: string
  slug: string
  capacity: number
  enrollmentsCount: number
  createdAt: Date
  updatedAt: Date
}
export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [enrollments, setEnrollments] = useState<Record<string, Enrollment[]>>({})
  const [enrollmentsLoading, setEnrollmentsLoading] = useState<string | null>(null)
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
  const toggleEnrollments = async (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null)
      return
    }
    setExpandedCourse(courseId)
    if (enrollments[courseId]) return
    setEnrollmentsLoading(courseId)
    try {
      const res = await fetch(`/api/courses/${courseId}/enrollments`)
      if (!res.ok) throw new Error('Failed to fetch enrollments')
      const data = await res.json()
      setEnrollments(prev => ({ ...prev, [courseId]: data }))
    } catch (err) {
      console.error(err)
    } finally {
      setEnrollmentsLoading(null)
    }
  }
  const removeEnrollment = async (courseId: string, enrollmentId: string) => {
    if (!confirm('Remove this enrollment?')) return
    try {
      const res = await fetch(`/api/courses/${courseId}/enrollments/${enrollmentId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to remove enrollment')
      setEnrollments(prev => ({
        ...prev,
        [courseId]: prev[courseId].filter(e => e.id !== enrollmentId)
      }))
      setCourses(prev => prev.map(c =>
        c.id === courseId ? { ...c, enrollmentsCount: c.enrollmentsCount - 1 } : c
      ))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove enrollment')
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
          <tbody>
            {courses.map(course => (
              <React.Fragment key={course.id}>
                <tr className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.capacity}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => toggleEnrollments(course.id)}
                      className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium hover:bg-green-200 transition-colors"
                    >
                      {course.enrollmentsCount} / {course.capacity}
                      {expandedCourse === course.id ? ' ▲' : ' ▼'}
                    </button>
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
                {
}
                {expandedCourse === course.id && (
                  <tr key={`${course.id}-enrollments`}>
                    <td colSpan={6} className="bg-gray-50 px-6 py-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Enrolled Students — {course.title}
                      </p>
                      {enrollmentsLoading === course.id ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                      ) : !enrollments[course.id]?.length ? (
                        <p className="text-sm text-gray-500">No enrollments yet.</p>
                      ) : (
                        <table className="w-full text-sm border rounded-lg overflow-hidden">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">Name</th>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">Email</th>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">Phone</th>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">WhatsApp</th>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">Country</th>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">Gender</th>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">Enrolled At</th>
                              <th className="px-4 py-2 text-left text-xs text-gray-600 uppercase">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y bg-white">
                            {enrollments[course.id].map(e => (
                              <tr key={e.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{e.user.name ?? '—'}</td>
                                <td className="px-4 py-2">{e.user.email}</td>
                                <td className="px-4 py-2">{e.user.phone ?? '—'}</td>
                                <td className="px-4 py-2">{e.user.whatsapp ?? '—'}</td>
                                <td className="px-4 py-2">{e.user.country ?? '—'}</td>
                                <td className="px-4 py-2">{e.user.gender ?? '—'}</td>
                                <td className="px-4 py-2">
                                  {new Date(e.enrolledAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                  <button
                                    onClick={() => removeEnrollment(course.id, e.id)}
                                    className="text-red-600 hover:text-red-900 text-xs"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
