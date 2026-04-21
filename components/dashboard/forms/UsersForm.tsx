'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string | null
  role: 'USER' | 'SUPER_ADMIN'
}

export default function UsersForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams.get('id')
  const isEdit = !!userId

  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'USER' as const,
  })

  useEffect(() => {
    if (isEdit) {
      fetchUser()
    }
  }, [isEdit, userId])

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      const data: User = await response.json()
      setFormData({
        email: data.email,
        name: data.name || '',
        role: data.role,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/users/${userId}` : '/api/users'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Failed to save user')
      }

      router.push('/dashboard?section=users&action=all')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading user...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit User' : 'Add New User'}</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-xl space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isEdit}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="user@example.com"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed after creation</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USER">User</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Super Admin has full access to the dashboard</p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard?section=users&action=all')}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
