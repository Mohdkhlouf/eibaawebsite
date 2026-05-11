'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { menuItemSchema, MenuItem } from '@/lib/types/menu'
import { createMenuItemAction, updateMenuItemAction, getMenuItemById } from '@/actions/menu'
import { getStaticPages } from '@/actions/staticPages'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface MenuItemFormData extends MenuItem {
  url?: string
  pageId?: string
}

export default function MenuForm() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const isEdit = !!id

  const [loading, setLoading] = useState(isEdit)
  const [pages, setPages] = useState<Array<{ id: string; title: string; slug: string }>>([])
  const [serverError, setServerError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema) as any,
    defaultValues: { label: '', linkType: 'custom', url: '', pageId: '', order: 0 },
  })

  const linkType = watch('linkType')
  const url = watch('url')
  const pageId = watch('pageId')

  useEffect(() => {
    const loadData = async () => {
      try {
        const staticPages = await getStaticPages()
        setPages(staticPages)

        if (isEdit) {
          const item = await getMenuItemById(String(id))
          if (!item) {
            setServerError('Menu item not found')
            return
          }

          const detectedLinkType = item.pageId ? 'page' : 'custom'
          reset({
            label: item.label,
            linkType: detectedLinkType,
            url: item.url || '',
            pageId: item.pageId || '',
            order: item.order,
          })
        }
      } catch (err) {
        setServerError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, isEdit, reset])

  const onValid = () => {
    setServerError(null)
    formRef.current?.requestSubmit()
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-bold text-gray-900">
        {isEdit ? 'Edit Menu Item' : 'Add Menu Item'}
      </h2>

      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>
      )}

      <form
        ref={formRef}
        action={isEdit ? updateMenuItemAction : createMenuItemAction}
        className="bg-white rounded-lg shadow p-6 w-full space-y-6"
      >
        {isEdit && <input type="hidden" name="id" value={String(id)} />}

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Label *</label>
          <input
            {...register('label')}
            name="label"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g. Home, About, Services"
          />
          {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>}
        </div>

        {/* Link Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Link Type *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                {...register('linkType')}
                type="radio"
                value="custom"
                className="w-4 h-4"
              />
              <span className="text-sm">Custom URL</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                {...register('linkType')}
                type="radio"
                value="page"
                className="w-4 h-4"
              />
              <span className="text-sm">Link to Page</span>
            </label>
          </div>
          {errors.linkType && <p className="text-red-500 text-sm mt-1">{errors.linkType.message}</p>}
        </div>

        {/* Custom URL */}
        {linkType === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL *</label>
            <input
              {...register('url')}
              name="url"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="https://example.com"
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
          </div>
        )}

        {/* Page Selection */}
        {linkType === 'page' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Page *</label>
            <select
              {...register('pageId')}
              name="pageId"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Choose a page...</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.title} (/{page.slug})
                </option>
              ))}
            </select>
            {errors.pageId && <p className="text-red-500 text-sm mt-1">{errors.pageId.message}</p>}
          </div>
        )}

        {/* Order */}
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
          <input
            {...register('order', { valueAsNumber: true })}
            name="order"
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Display order"
          />
          {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSubmit(onValid, () => {})}
            type="button"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Item' : 'Create Item'}
          </button>
          <Link href="/dashboard?section=menu" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
