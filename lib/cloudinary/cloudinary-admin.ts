import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const deleteCloudinaryImage = async (imageUrl: string) => {
  try {
    // Extract public_id from URL
    // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123456/<public_id>.jpg
    const urlParts = imageUrl.split('/')
    const fileWithExt = urlParts[urlParts.length - 1]
    const publicId = fileWithExt.split('.')[0]

    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('[CLOUDINARY_DELETE]', error)
  }
}
