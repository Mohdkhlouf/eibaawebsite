import { DataGrid } from '@/components/ui/DataGrid'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { deleteStaticPage } from '@/actions/staticPages'

export default async function StaticPagesList() {
  const pages = await prisma.staticPage.findMany({ orderBy: { createdAt: 'desc' } })

  // If no pages exist, render nothing (no pages to manage)
  if (!pages || pages.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Static Pages</h2>
        <Link href="/dashboard?section=pages&action=add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ Add Page</Link>
      </div>

      <DataGrid
        data={pages}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'slug', label: 'Slug' },
          { key: 'createdAt', label: 'Created', render: (p: any) => new Date(p.createdAt).toLocaleDateString() },
        ]}
        actions={[
          { label: 'Edit', href: (p: any) => `/dashboard?section=pages&action=edit&id=${p.id}` },
          { label: 'Delete', variant: 'danger', formAction: '/dashboard/pages/delete' },
        ]}
      />
    </div>
  )
}
