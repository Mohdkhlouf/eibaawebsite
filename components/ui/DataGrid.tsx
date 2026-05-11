import Link from 'next/link'

export type Column<T> = {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

type Action<T> = {
  label: string
  href?: (row: T) => string
  formAction?: string | ((formData: FormData) => Promise<any>)
  variant?: 'default' | 'danger'
}

type Props<T extends { id: string | number }> = {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
}

export function DataGrid<T extends { id: string | number }>({ data, columns, actions }: Props<T>) {
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
            {actions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map(row => (
            <tr key={String(row.id)} className="hover:bg-gray-50">
              {columns.map(col => (
                <td key={String(col.key)} className="px-6 py-4 text-sm text-gray-700">
                  {col.render ? col.render(row) : String((row as any)[col.key] ?? 'N/A')}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm space-x-2">
                  {actions.map(action => {
                    if (action.href) {
                      return (
                        <Link key={action.label} href={action.href(row)} className="text-blue-600 hover:text-blue-900">
                          {action.label}
                        </Link>
                      )
                    }

                    if (typeof action.formAction === 'string') {
                      return (
                        <form key={action.label} method="post" action={action.formAction} className="inline">
                          <input type="hidden" name="id" value={(row as any).id} />
                          <button type="submit" className={action.variant === 'danger' ? 'text-red-600 hover:text-red-900' : 'text-blue-600 hover:text-blue-900'}>
                            {action.label}
                          </button>
                        </form>
                      )
                    }

                    if (typeof action.formAction === 'function') {
                      const fn = action.formAction as unknown as (formData: FormData) => Promise<any>
                      return (
                        <form key={action.label} action={fn} className="inline">
                          <input type="hidden" name="id" value={(row as any).id} />
                          <button type="submit" className={action.variant === 'danger' ? 'text-red-600 hover:text-red-900' : 'text-blue-600 hover:text-blue-900'}>
                            {action.label}
                          </button>
                        </form>
                      )
                    }

                    return null
                  })}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
