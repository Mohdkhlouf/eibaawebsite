'use client'
import { useTransition } from 'react'

type Props = {
  label: string
  variant?: 'default' | 'danger'
  onDelete: () => void
}

export function DeleteButton({ label, variant, onDelete }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm(`Are you sure you want to delete this item?`)) return
    startTransition(() => onDelete())
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`disabled:opacity-50 ${
        variant === 'danger'
          ? 'text-red-600 hover:text-red-900'
          : 'text-blue-600 hover:text-blue-900'
      }`}
    >
      {isPending ? 'Deleting...' : label}
    </button>
  )
}
