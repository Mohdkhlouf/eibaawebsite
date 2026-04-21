'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
}

export default function CategoriesForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryId = searchParams.get('id')
  const isEdit = !!categoryId

  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
  })

  useEffect(() => {
    if (isEdit) {
      fetchCategory()
    }
  }, [isEdit, categoryId])

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`)
      if (!response.ok) throw new Error('Failed to fetch category')
      const data: Category = await response.json()
      setFormData({
        name: data.name,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch category')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const url = isEdit ? `/api/categories/${categoryId}` : '/api/categories'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Failed to save category')
      }

      router.push('/dashboard?section=categories&action=all')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading category...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Category' : 'Add New Category'}</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-xl space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter category name"
          />
          <p className="text-xs text-gray-500 mt-1">Must be unique</p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Category' : 'Create Category'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard?section=categories&action=all')}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
