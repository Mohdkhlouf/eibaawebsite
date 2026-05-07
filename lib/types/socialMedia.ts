import { z } from 'zod'

export const SocialMediaLinkSchema = z.object({
  name:  z.string().min(1, 'Name is required').max(100),
  url:   z.string().url('Must be a valid URL').max(100),
  icon:  z.string().min(1, 'Icon is required').max(100),
  order: z.number().int().nonnegative('Order must be 0 or greater'),
})

export type SocialMediaLink = z.infer<typeof SocialMediaLinkSchema>
