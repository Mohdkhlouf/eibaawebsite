import React from 'react'
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

type FeaturedArticleAttributes = {
  TitleName?: string
  ArticleText?: string
  ArticleThumbnail?: ThumbnailData
}

type FeaturedArticle = {
  id: string | number
  attributes?: FeaturedArticleAttributes
}

type FeaturedArticlesProps = {
  data: FeaturedArticle[]
}

export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ data }) => {
  console.log(data);

  return (
    <section className="flex flex-row">
      {data.map((item, index) => (
        <div className="flex flex-col items-center p-4 w-full" key={item.id ?? index} style={{backgroundColor: '#60768e20'}}>
          <Link href={`/Articles/${item.id}`}>
            <div className="mb-8" style={{width: '28.1258rem', height: '19.625rem'}}>
              <img src={item.attributes?.ArticleThumbnail?.data?.attributes?.url ?? ''} alt={item.attributes?.ArticleThumbnail?.data?.attributes?.url ?? ''} className="w-full" />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-[#60768e] font-family-tajawal text-2xl font-semibold text-center h-20 inline-block">
                {item.attributes?.TitleName ?? ''}
              </h2>

              <p className="text-xl text-justify">
                {item.attributes?.ArticleText ? item.attributes.ArticleText.substring(0, 200) : ''}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </section>
  )
}
