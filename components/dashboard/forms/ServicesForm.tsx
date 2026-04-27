'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CldUploadWidget } from 'next-cloudinary'
import { serviceSchema, ServiceFormData } from '@/lib/types/service'
import CloudinaryUpload from '@/components/cloudinary/CloudinaryUpload'
import { cloudinaryConfig } from '@/lib/cloudinary/cloudinary'
import { createService, updateService, getServiceById } from '@/app/actions/services'

export default function ServicesForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const serviceId = searchParams.get('id')
  const isEdit = !!serviceId

  const [loading, setLoading] = useState(isEdit)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema) as any,
    defaultValues: { title: '', slug: '', shortDesc: '', content: '', thumbnail: '' },
  })

  useEffect(() => {
    if (isEdit) fetchService()
  }, [isEdit, serviceId])

  const fetchService = async () => {
    try {
      const srv = await getServiceById(serviceId!)
      if (!srv) throw new Error('Service not found')
      reset({
        title: srv.title,
        slug: srv.slug,
        shortDesc: srv.shortDesc,
        content: srv.content,
        thumbnail: srv.thumbnail,
      })
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to fetch service')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) =>
    title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    setValue('slug', generateSlug(title))
  }

  const onSubmit = async (data: ServiceFormData) => {
    setServerError(null)
    try {
      if (isEdit) {
        await updateService(serviceId!, data)
      } else {
        await createService(data)
      }
      router.push('/dashboard?section=services&action=all')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (loading) return <div className="text-center py-12">Loading service...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Service' : 'Add New Service'}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-6">
        {serverError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input type="text" {...register('title')} onChange={handleTitleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter service title" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input type="text" {...register('slug')} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Auto-generated from title" />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
          <input type="text" {...register('shortDesc')} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Short description for preview" />
          {errors.shortDesc && <p className="text-red-500 text-sm mt-1">{errors.shortDesc.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <textarea {...register('content')} rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Write service content here" />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail *</label>
          <CloudinaryUpload onUpload={(url: string) => setValue('thumbnail', url, { shouldValidate: true })} />
          {watch('thumbnail') && <img src={watch('thumbnail')} alt="Thumbnail preview" className="mt-2 h-20 rounded-lg object-cover" />}
          {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg">{isSubmitting ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}</button>
          <button type="button" onClick={() => router.push('/dashboard?section=services&action=all')} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  )
}
