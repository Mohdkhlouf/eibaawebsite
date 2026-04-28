'use client'
import Link from 'next/link'
import { useTransition } from 'react'

export type Column<T> = {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

type Action<T> = {
  label: string
  href?: (row: T) => string
  onClick?: (row: T) => Promise<void>
  variant?: 'default' | 'danger'
}

type Props<T extends { id: string }> = {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
}

function DeleteButton({ onDelete, label, variant }: {
  onDelete: () => Promise<void>
  label: string
  variant?: 'default' | 'danger'
}) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm('Are you sure you want to delete this item?')) return
    startTransition(() => onDelete())
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`disabled:opacity-50 ${
        variant === 'danger' ? 'text-red-600 hover:text-red-900' : 'text-blue-600 hover:text-blue-900'
      }`}
    >
      {isPending ? 'Deleting...' : label}
    </button>
  )
}

export function DataGrid<T extends { id: string }>({ data, columns, actions }: Props<T>) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map(col => (
                <td key={String(col.key)} className="px-6 py-4 text-sm text-gray-700">
                  {col.render ? col.render(row) : String((row as any)[col.key] ?? 'N/A')}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm space-x-2">
                  {actions.map(action =>
                    action.href ? (
                      <Link
                        key={action.label}
                        href={action.href(row)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {action.label}
                      </Link>
                    ) : (
                      <DeleteButton
                        key={action.label}
                        label={action.label}
                        variant={action.variant}
                        onDelete={() => action.onClick!(row)}
                      />
                    )
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No records found.
        </div>
      )}
    </div>
  )
}
