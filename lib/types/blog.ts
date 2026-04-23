import { z } from 'zod'

export const blogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  shortTitle: z.string().min(3, 'Short title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  content: z.string().min(10, 'Content is too short'),
  categoryId: z.string().min(1, 'Category is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  published: z.boolean().default(false),
})

export type BlogFormData = z.infer<typeof blogSchema>
