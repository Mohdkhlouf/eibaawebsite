import { z } from 'zod'

export const menuItemSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, 'Label is required').max(100, 'Label must be 100 characters or less'),
  linkType: z.enum(['custom', 'page']),
  url: z.string().optional(),
  pageId: z.string().optional(),
  order: z.number().int().optional(),
}).refine((data) => {
  if (data.linkType === 'custom' && !data.url) {
    return false
  }
  if (data.linkType === 'page' && !data.pageId) {
    return false
  }
  return true
}, {
  message: 'Please provide either a custom URL or select a page',
  path: ['url'],
})

export type MenuItem = z.infer<typeof menuItemSchema>
