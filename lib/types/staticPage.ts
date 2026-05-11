import { z } from 'zod'

export const StaticPageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  content: z.string().min(1, 'Content is required'),
})

export type StaticPage = z.infer<typeof StaticPageSchema>
export type StaticPageForm = StaticPage
