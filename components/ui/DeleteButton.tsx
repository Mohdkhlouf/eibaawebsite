'use client'
import { useTransition } from 'react'

type Props = {
  id: number | string
  action: (id: number | string) => Promise<void>
  label?: string
}

export function DeleteButton({ id, action, label = 'Delete' }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm('Are you sure you want to delete this item?')) return
    startTransition(() => action(id))
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : label}
    </button>
  )
}
