'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CldUploadWidget } from 'next-cloudinary'
import { blogSchema, BlogFormData } from '@/lib/types/blog'
import CloudinaryUpload from '@/components/cloudinary/CloudinaryUpload'
import RichTextEditor from '@/components/editor/EditorWrapper'
import { cloudinaryConfig } from '@/lib/cloudinary/cloudinary'
// ─── Types ────────────────────────────────────────────────
interface Category {
  id: string
  name: string
}

interface Blog {
  id: string
  title: string
  shortTitle: string
  slug: string
  content: string
  category: Category
  categoryId: string
  thumbnail: string
  published: boolean
  author: { id: string; name: string | null }
  authorId: string
}

// ─── Component ────────────────────────────────────────────
export default function BlogsForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const blogId = searchParams.get('id')
  const isEdit = !!blogId

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(isEdit)
  const [serverError, setServerError] = useState<string | null>(null)

  // ─── Refs for editor image upload ─────────────────────
  const imageCallbackRef = useRef<((url: string) => void) | null>(null)
  const openEditorUploadRef = useRef<(() => void) | null>(null)

  const handleEditorImageUpload = (callback: (url: string) => void) => {
    imageCallbackRef.current = callback
    openEditorUploadRef.current?.()
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema) as any,
    defaultValues: {
      title: '',
      shortTitle: '',
      slug: '',
      content: '',
      categoryId: '',
      thumbnail: '',
      published: false,
    },
  })

  // ─── Fetch categories & blog ───────────────────────────
  useEffect(() => {
    fetchCategories()
    if (isEdit) fetchBlog()
  }, [isEdit, blogId])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (!res.ok) throw new Error('Failed to fetch categories')
      setCategories(await res.json())
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to fetch categories')
    }
  }

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${blogId}`)
      if (!res.ok) throw new Error('Failed to fetch blog')
      const data: Blog = await res.json()
      reset({
        title: data.title,
        shortTitle: data.shortTitle,
        slug: data.slug,
        content: data.content,
        categoryId: data.categoryId,
        thumbnail: data.thumbnail,
        published: data.published,
      })
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to fetch blog')
    } finally {
      setLoading(false)
    }
  }

  // ─── Slug generator ───────────────────────────────────
  const generateSlug = (title: string) =>
    title.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    setValue('slug', generateSlug(title))
  }

  // ─── Submit ───────────────────────────────────────────
  const onSubmit = async (data: BlogFormData) => {
    setServerError(null)
    try {
      const res = await fetch(isEdit ? `/api/blogs/${blogId}` : '/api/blogs', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to save blog')
      }
      router.push('/dashboard?section=blogs&action=all')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (loading) return <div className="text-center py-12">Loading blog...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Blog' : 'Add New Blog'}</h2>

      {/* Hidden Cloudinary widget for editor image uploads */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        options={cloudinaryConfig.options}
        onSuccess={(result: any) => {
          const url = result.info.secure_url
          imageCallbackRef.current?.(url)
          imageCallbackRef.current = null
        }}
      >
        {({ open }) => {
          openEditorUploadRef.current = open
          return <span className="hidden" />
        }}
      </CldUploadWidget>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-6">

        {serverError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {serverError}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            {...register('title')}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter blog title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Short Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Short Title *</label>
          <input
            type="text"
            {...register('shortTitle')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter short title for preview"
          />
          {errors.shortTitle && <p className="text-red-500 text-sm mt-1">{errors.shortTitle.message}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input
            type="text"
            {...register('slug')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Auto-generated from title"
          />
          <p className="text-xs text-gray-500 mt-1">Auto-generated from title. Edit if needed.</p>
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              {...register('categoryId')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail *</label>
            <CloudinaryUpload
              onUpload={(url: string) => setValue('thumbnail', url, { shouldValidate: true })}
            />
            {watch('thumbnail') && (
              <img src={watch('thumbnail')} alt="Thumbnail preview" className="mt-2 h-20 rounded-lg object-cover" />
            )}
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <RichTextEditor
            value={watch('content')}
            onChange={(val) => setValue('content', val, { shouldValidate: true })}
            placeholder="Write your blog content here..."
            onImageUpload={handleEditorImageUpload}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        {/* Published */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('published')}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">Publish immediately</label>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Blog' : 'Create Blog'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard?section=blogs&action=all')}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}
