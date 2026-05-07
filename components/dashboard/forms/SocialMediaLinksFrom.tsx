'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SocialMediaLinkSchema, SocialMediaLink } from '@/lib/types/socialMedia'
import { createSocialMediaLinkAction, updateSocialMediaLinkAction, getSocialMediaLinkById } from '@/actions/socialMediaLinks'
import Link from 'next/link'

export default function SocialMediaLinksFormClient({ searchParams }: { searchParams?: Record<string, string | string[]> | null }) {
  const params = searchParams || {}
  const id = Array.isArray(params?.id) ? params.id[0] : (params as any)?.id
  const isEdit = !!id

  const [loading, setLoading] = useState(isEdit)
  const [serverError, setServerError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SocialMediaLink>({
    resolver: zodResolver(SocialMediaLinkSchema) as any,
    defaultValues: { name: '', url: '', icon: '', order: 0 }
  })

  useEffect(() => {
    if (!isEdit) return
    let mounted = true
    setLoading(true)
    getSocialMediaLinkById(String(id)).then(link => {
      if (!mounted) return
      if (!link) {
        setServerError('Social media link not found')
        return
      }
      reset({ name: link.name, url: link.url, icon: link.icon, order: link.order })
    }).catch(e => {
      setServerError(e?.message || String(e))
    }).finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id, isEdit, reset])

  const onValid = (data: SocialMediaLink) => {
    setServerError(null)
    // Submit the native form to server action after client validation
    // formRef will carry the same inputs as react-hook-form
    formRef.current?.requestSubmit()
  }

  const onInvalid = () => {
    // hand back to user; errors are displayed via `errors`
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Social Media Link' : 'Add Social Media Link'}</h2>

      {serverError && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>}

      <form ref={formRef} action={isEdit ? updateSocialMediaLinkAction : createSocialMediaLinkAction} className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-6">
        {isEdit && <input type="hidden" name="id" value={String(id)} />}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input {...register('name')} name="name" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Twitter, LinkedIn" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL *</label>
          <input {...register('url')} name="url" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="https://twitter.com/yourhandle" />
          {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Icon *</label>
          <input {...register('icon')} name="icon" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="e.g. twitter, linkedin" />
          {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Order *</label>
          <input {...register('order', { valueAsNumber: true })} name="order" type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Display order (must be unique)" />
          {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>}
        </div>

        <div className="flex gap-4">
          <button onClick={handleSubmit(onValid, onInvalid)} type="button" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Link' : 'Create Link'}
          </button>
          <Link href="/dashboard?section=socialMediaLinks" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
