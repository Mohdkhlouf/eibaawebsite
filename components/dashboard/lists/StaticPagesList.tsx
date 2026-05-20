import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { deleteStaticPageAction } from '@/actions/staticPages'
export default async function StaticPagesList() {
  const pages = await prisma.staticPage.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Static Pages</h2>
        <Link href="/dashboard?section=pages&action=add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          + Add Page
        </Link>
      </div>
      {pages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">No pages found. Create your first page!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{page.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(page.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Link href={`/dashboard?section=pages&action=edit&id=${page.id}`} className="text-blue-600 hover:text-blue-900">
                      Edit
                    </Link>
                    <DeleteButton id={page.id} action={deleteStaticPageAction} />
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
