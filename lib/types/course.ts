import { z } from 'zod'

export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  capacity: z.number().int().positive('Capacity must be greater than 0'),
})

export type Course = z.infer<typeof courseSchema>
export type CourseFormData = Course
