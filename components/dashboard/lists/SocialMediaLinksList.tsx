
import { prisma } from '@/lib/prisma'
import Link from 'next/link'


export default async function SocialMediaLinksList() {
  const links = await prisma.socialMediaLink.findMany({ orderBy: { order: 'desc' } })
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Social Media Links</h2>
        <Link href="/dashboard?section=socialMediaLinks&action=add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ Add Service</Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Url</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {links.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{s.url}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{s.icon}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{s.order}</td>
                {/*<td className="px-6 py-4 text-sm space-x-2">
                  <Link href={`/dashboard?section=services&action=edit&id=${s.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {links.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">No services found. Create your first service!</p>
        </div>
      )}
    </div>
  )
}
