import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { deleteMenuItemAction } from '@/actions/menu'

export default async function MenuList() {
  const items = await prisma.menuItem.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
        <Link href="/dashboard?section=menu&action=add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          + Add Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">No menu items. Create your first item!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Label</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.pageId ? `[Page Link]` : (item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs block">
                        {item.url}
                      </a>
                    ) : 'N/A')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.order}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Link href={`/dashboard?section=menu&action=edit&id=${item.id}`} className="text-blue-600 hover:text-blue-900">
                      Edit
                    </Link>
                    <DeleteButton id={item.id} action={deleteMenuItemAction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
