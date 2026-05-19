'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SocialMediaLinkSchema, SocialMediaLink } from '@/lib/types/socialMedia'
import { createSocialMediaLinkAction, updateSocialMediaLinkAction, getSocialMediaLinkById } from '@/actions/socialMediaLinks'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SOCIAL_ICONS } from '@/lib/socialIcons'
export default function SocialMediaLinksFormClient() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const isEdit = !!id
  const [loading, setLoading] = useState(isEdit)
  const [serverError, setServerError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<SocialMediaLink>({
    resolver: zodResolver(SocialMediaLinkSchema) as any,
    defaultValues: { name: '', url: '', icon: '', order: 0 }
  })
  const selectedIcon = watch('icon')
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
  const onValid = () => {
    setServerError(null)
    formRef.current?.requestSubmit()
  }
  if (loading) return <div className="text-center py-12">Loading...</div>
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-bold text-gray-900">
        {isEdit ? 'Edit Social Media Link' : 'Add Social Media Link'}
      </h2>
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>
      )}
      <form
        ref={formRef}
        action={isEdit ? updateSocialMediaLinkAction : createSocialMediaLinkAction}
        className="bg-white rounded-lg shadow p-6 w-full space-y-6"
      >
        {isEdit && <input type="hidden" name="id" value={String(id)} />}
        {
}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              {...register('name')}
              name="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g. Facebook, Instagram"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL *</label>
            <input
              {...register('url')}
              name="url"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="https://instagram.com/yourhandle"
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
          </div>
        </div>
        {
}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Icon *</label>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16 gap-2">
            {SOCIAL_ICONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue('icon', value, { shouldValidate: true })}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-colors ${
                  selectedIcon === value
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
                title={label}
              >
                <Icon size={22} />
                <span className="text-xs leading-none">{label}</span>
              </button>
            ))}
          </div>
          <input type="hidden" {...register('icon')} />
          {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>}
        </div>
        {
}
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">Order *</label>
          <input
            {...register('order', { valueAsNumber: true })}
            name="order"
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Display order (must be unique)"
          />
          {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>}
        </div>
        {
}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSubmit(onValid, () => {})}
            type="button"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Link' : 'Create Link'}
          </button>
          <Link href="/dashboard?section=socialMediaLinks" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
