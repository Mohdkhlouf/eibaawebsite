'use client'
import { useState } from 'react'
import { enrollInCourse } from '@/actions/enroll'
export default function EnrollButton({
  courseId,
  isEnrolled,
  isLoggedIn,
  isFull,
}: {
  courseId: string
  isEnrolled: boolean
  isLoggedIn: boolean
  isFull: boolean
}) {
  const [enrolled, setEnrolled] = useState(isEnrolled)
  const [loading, setLoading] = useState(false)
  if (!isLoggedIn) {
    return (
      <a
        href="/login"
        className="inline-block mt-8 px-6 py-3 bg-[#3D3350] text-white rounded-lg hover:bg-[#5A4B70] transition-colors"
      >
        Login to Enroll
      </a>
    )
  }
  if (enrolled) {
    return (
      <div className="mt-8 px-6 py-3 bg-green-100 text-green-700 rounded-lg inline-block">
        ✓ Already Enrolled
      </div>
    )
  }
  if (isFull) {
    return (
      <div className="mt-8 px-6 py-3 bg-red-100 text-red-700 rounded-lg inline-block">
        ✗ Course is Full
      </div>
    )
  }
  async function handleEnroll() {
    setLoading(true)
    const result = await enrollInCourse(courseId)
    if (result?.success) setEnrolled(true)
    setLoading(false)
  }
  return (
    <div className="mt-8">
      <button
        onClick={handleEnroll}
        disabled={loading}
        className="px-6 py-3 bg-[#3D3350] text-white rounded-lg hover:bg-[#5A4B70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Enrolling...' : 'Enroll Now'}
      </button>
    </div>
  )
}
