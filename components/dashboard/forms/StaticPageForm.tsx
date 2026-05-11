'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import RichTextEditor from '@/components/editor/EditorWrapper'
import { StaticPageSchema, StaticPageForm } from '@/lib/types/staticPage'
import { createStaticPageAction, updateStaticPageAction, getStaticPageById } from '@/actions/staticPages'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function StaticPageFormClient() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const isEdit = !!id

  const [loading, setLoading] = useState(isEdit)
  const [serverError, setServerError] = useState<string | null>(null)
  const [initialContent, setInitialContent] = useState('')

  const formRef = useRef<HTMLFormElement | null>(null)

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<StaticPageForm>({
    resolver: zodResolver(StaticPageSchema) as any,
    defaultValues: { title: '', slug: '', content: '' }
  })

  useEffect(() => {
    if (!isEdit) return
    let mounted = true
    setLoading(true)
    getStaticPageById(String(id))
      .then(page => {
        if (!mounted) return
        if (!page) {
          setServerError('Page not found')
          return
        }
        reset({ title: page.title, slug: page.slug, content: page.content })
        setInitialContent(page.content)
      })
      .catch(e => setServerError(e?.message || String(e)))
      .finally(() => mounted && setLoading(false))

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
        {isEdit ? 'Edit Page' : 'Add New Page'}
      </h2>

      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>
      )}

      <form
        ref={formRef}
        action={isEdit ? updateStaticPageAction : createStaticPageAction}
        className="bg-white rounded-lg shadow p-6 w-full space-y-6"
      >
        {isEdit && <input type="hidden" name="id" value={String(id)} />}
        <input type="hidden" name="content" {...register('content')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              {...register('title')}
              name="title"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Page title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input
              {...register('slug')}
              name="slug"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="page-slug"
            />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <RichTextEditor
            value={initialContent}
            onChange={(val) => setValue('content', val)}
            placeholder="Page content"
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSubmit(onValid)}
            type="button"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Page' : 'Create Page'}
          </button>
          <Link href="/dashboard?section=pages" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
