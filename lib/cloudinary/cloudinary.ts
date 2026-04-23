import { CloudinaryUploadWidgetOptions } from 'next-cloudinary';

export const cloudinaryConfig: { uploadPreset: string; options: CloudinaryUploadWidgetOptions } = {
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  options: {
    multiple: false,
    sources: ['local', 'url'] as const,
    showUploadMoreButton: false,
    singleUploadAutoClose: false,
    showPoweredBy: false,
    showAdvancedOptions: false,
    cropping: false,
  },
}
