'use client'
import { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { cloudinaryConfig } from '@/lib/cloudinary/cloudinary'

interface CloudinaryUploadProps {
  onUpload: (url: string) => void
}

export default function CloudinaryUpload({ onUpload }: CloudinaryUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleUpload = (result: any) => {
    const url = result.info.secure_url
    setPreviewUrl(url)
    onUpload(url)
  }

  const handleCancel = () => {
    setPreviewUrl(null)
    onUpload('')
  }

  return (
    <div className="space-y-2">
      {!previewUrl ? (
        <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          options={cloudinaryConfig.options}
          onSuccess={handleUpload}>
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
            >
              Upload an Image
            </button>
          )}
        </CldUploadWidget>
      ) : (
        <div className="relative w-full">
          <Image
            src={previewUrl}
            alt="Uploaded thumbnail"
            width={400}
            height={200}
            className="w-full h-40 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleCancel}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
