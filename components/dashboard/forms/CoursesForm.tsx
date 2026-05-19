'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { courseSchema, CourseFormData } from '@/lib/types/course'
import { createCourseAction, updateCourseAction, getCourseById } from '@/actions/courses'
import CloudinaryUpload from '@/components/cloudinary/CloudinaryUpload'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CoursesForm() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const isEdit = !!id

  const [loading, setLoading] = useState(isEdit)
  const [serverError, setServerError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: { title: '', slug: '', content: '', thumbnail: '', capacity: 30 },
  })

  const generateSlug = (title: string) =>
    title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    setValue('slug', generateSlug(title))
  }

  useEffect(() => {
    if (isEdit) fetchCourse()
  }, [isEdit, id])

  const fetchCourse = async () => {
    try {
      const course = await getCourseById(String(id))
      if (!course) throw new Error('Course not found')
      reset({
        title: course.title,
        slug: course.slug,
        content: course.content,
        thumbnail: course.thumbnail,
        capacity: course.capacity,
      })
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to fetch course')
    } finally {
      setLoading(false)
    }
  }

  const onValid = () => {
    setServerError(null)
    formRef.current?.requestSubmit()
  }

  const thumbnail = watch('thumbnail')

  if (loading) return <div className="text-center py-12">Loading course...</div>

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-bold text-gray-900">
        {isEdit ? 'Edit Course' : 'Add New Course'}
      </h2>

      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{serverError}</div>
      )}

      <form
        ref={formRef}
        action={isEdit ? updateCourseAction : createCourseAction}
        className="bg-white rounded-lg shadow p-6 w-full space-y-6"
      >
        {isEdit && <input type="hidden" name="id" value={String(id)} />}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            {...register('title')}
            name="title"
            type="text"
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter course title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          <p className="text-xs text-gray-500 mt-1">Must be unique</p>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input
            {...register('slug')}
            name="slug"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Auto-generated from title"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          <p className="text-xs text-gray-500 mt-1">Auto-generated from title. Edit if needed.</p>
        </div>

        {/* Thumbnail and Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail *</label>
            <CloudinaryUpload onUpload={(url: string) => setValue('thumbnail', url)} />
            {thumbnail && (
              <img src={thumbnail} alt="Thumbnail preview" className="mt-2 h-20 rounded-lg object-cover" />
            )}
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
            <input
              {...register('capacity', { valueAsNumber: true })}
              name="capacity"
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Maximum number of students"
            />
            {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
            <p className="text-xs text-gray-500 mt-1">Maximum number of enrollments allowed</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <textarea
            {...register('content')}
            name="content"
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Write your course description, curriculum, and details here..."
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        {/* Hidden input for thumbnail */}
        <input type="hidden" {...register('thumbnail')} />

        {/* Actions */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSubmit(onValid, () => {})}
            type="button"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
          </button>
          <Link href="/dashboard?section=courses" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
