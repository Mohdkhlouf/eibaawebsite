import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email('Must be a valid email'),
  name: z.string().min(1, 'Name is required').max(200),
  role: z.enum(['USER', 'SUPER_ADMIN']),
})

export type User = z.infer<typeof userSchema>
export type UserFormData = User
