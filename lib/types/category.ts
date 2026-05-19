import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name must be 100 characters or less'),
})

export type Category = z.infer<typeof categorySchema>
export type CategoryFormData = Category
