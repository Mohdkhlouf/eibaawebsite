'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getServices, deleteService } from '@/app/actions/services'

interface Service {
  id: string
  title: string
  slug: string
  shortDesc: string
  thumbnail: string
  createdAt: Date
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await getServices()
      setServices(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await deleteService(id)
      setServices(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete service')
    }
  }

  if (loading) return <div className="text-center py-12">Loading services...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">All Services</h2>
        <Link href="/dashboard?section=services&action=add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ Add Service</Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Short</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{s.shortDesc}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{(typeof s.createdAt === 'string' ? new Date(s.createdAt) : s.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Link href={`/dashboard?section=services&action=edit&id=${s.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">No services found. Create your first service!</p>
        </div>
      )}
    </div>
  )
}
