'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormData } from '@/lib/types/user'
import { updateUserAction, getUserById } from '@/actions/users'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function UsersForm() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const isEdit = !!id

  const [loading, setLoading] = useState(isEdit)
  const [serverError, setServerError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema) as any,
    defaultValues: { email: '', name: '', role: 'USER' },
  })

  useEffect(() => {
    if (!isEdit) return
    let mounted = true
    setLoading(true)
    getUserById(String(id)).then(user => {
      if (!mounted) return
      if (!user) {
        setServerError('User not found')
        return
      }
      reset({ email: user.email, name: user.name || '', role: user.role as 'USER' | 'SUPER_ADMIN' })
    }).catch(e => {
      setServerError(e?.message || String(e))
    }).finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id, isEdit, reset])

  const onValid = () => {
    setServerError(null)
    formRef.current?.requestSubmit()
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-bold text-gray-900">
        {isEdit ? 'Edit User' : 'Add New User'}
      </h2>

      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>
      )}

      <form
        ref={formRef}
        action={updateUserAction}
        className="bg-white rounded-lg shadow p-6 w-full space-y-6"
      >
        {isEdit && <input type="hidden" name="id" value={String(id)} />}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            {...register('email')}
            name="email"
            type="email"
            disabled={isEdit}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="user@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          {isEdit && <p className="text-xs text-gray-500 mt-1">Email cannot be changed after creation</p>}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            {...register('name')}
            name="name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
          <select
            {...register('role')}
            name="role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="USER">User</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          <p className="text-xs text-gray-500 mt-1">Super Admin has full access to the dashboard</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSubmit(onValid, () => {})}
            type="button"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
          </button>
          <Link href="/dashboard?section=users" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
