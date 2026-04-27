import { z } from 'zod'

export const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  shortDesc: z.string().min(10, 'Short description must be at least 10 characters'),
  content: z.string().min(10, 'Content is too short'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
