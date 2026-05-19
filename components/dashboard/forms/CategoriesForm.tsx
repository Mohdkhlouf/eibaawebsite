'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema, CategoryFormData } from '@/lib/types/category'
import { createCategoryAction, updateCategoryAction, getCategoryById } from '@/actions/categories'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default function CategoriesForm() {
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
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: { name: '' },
  })
  useEffect(() => {
    if (!isEdit) return
    let mounted = true
    setLoading(true)
    getCategoryById(String(id)).then(category => {
      if (!mounted) return
      if (!category) {
        setServerError('Category not found')
        return
      }
      reset({ name: category.name })
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
        {isEdit ? 'Edit Category' : 'Add New Category'}
      </h2>
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>
      )}
      <form
        ref={formRef}
        action={isEdit ? updateCategoryAction : createCategoryAction}
        className="bg-white rounded-lg shadow p-6 w-full space-y-6"
      >
        {isEdit && <input type="hidden" name="id" value={String(id)} />}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
          <input
            {...register('name')}
            name="name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter category name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          <p className="text-xs text-gray-500 mt-1">Must be unique</p>
        </div>
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSubmit(onValid, () => {})}
            type="button"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Category' : 'Create Category'}
          </button>
          <Link href="/dashboard?section=categories" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
