import React from 'react'
import useFetch from '../app/Hooks/useFetch'
import Link from 'next/link'

type ThumbnailFormat = {
  url?: string
  name?: string
}

type ThumbnailAttributes = {
  formats?: {
    thumbnail?: ThumbnailFormat
  }
  url?: string
  name?: string
}

type ThumbnailData = {
  data?: {
    attributes?: ThumbnailAttributes
  }
}

type PostAttributes = {
  TitleName?: string
  ArticleText?: string
  ArticleThumbnail?: ThumbnailData
}

type Post = {
  id: string | number
  attributes?: PostAttributes
}

export const Blog: React.FC = () => {
  const { loading, error, data } = useFetch<Post[]>('https://eibaa-5c47424909f6.herokuapp.com/api/articles?sort=ArticleAddDate:desc&populate=*')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  return (
    <div className=''>
      <div className="max-w-[1000px] mx-auto w-full">
        <div className="">
          <div className='flex flex-col items-center justify-center'>
            <h2 className="text-[var(--mainColor)]">المقالات</h2>
            <p className="">مداد القلم وخلاصة الأفكار</p>
          </div>
        </div>

        <div className="flex">
          {data && data.slice(0, 3).map((post) => {
            const thumb =
              post.attributes?.ArticleThumbnail?.data?.attributes?.formats?.thumbnail?.url ??
              post.attributes?.ArticleThumbnail?.data?.attributes?.url ??
              ''
            const alt =
              post.attributes?.ArticleThumbnail?.data?.attributes?.formats?.thumbnail?.name ??
              post.attributes?.ArticleThumbnail?.data?.attributes?.name ??
              'article thumbnail'

            return (
              <div className="flex-1" key={post.id}>
                <div className="flex flex-col p-4">
                  <Link href={`/Articles/${post.id}`}>
                    <div className="">
                      <img src={thumb} alt={alt} />
                    </div>
                    <div className="text-center mt-4">
                      <h2 className="text-sm font-bold">{post.attributes?.TitleName}</h2>
                    </div>
                    <p className="text-justify">{post.attributes?.ArticleText ? post.attributes.ArticleText.substring(0, 200) : ''}</p>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
