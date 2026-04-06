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
    <div className='Posts'>
      <div className="container">
        <div className="row">
          <div className='sectionHeader'>
            <h2 className="sectionHeaderTitle ">المقالات</h2>
            <p className="sectionHeaderDetails ">مداد القلم وخلاصة الأفكار</p>
          </div>
        </div>

        <div className="row">
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
              <div className="col-md-4" key={post.id}>
                <div className="homePageArticle">
                  <Link href={`/Articles/${post.id}`}>
                    <div className="homePageArticleimg">
                      <img src={thumb} alt={alt} />
                    </div>
                    <div className="homePageArticleTitle">
                      <h2>{post.attributes?.TitleName}</h2>
                    </div>
                    <p className="homePageArticleText">{post.attributes?.ArticleText ? post.attributes.ArticleText.substring(0, 200) : ''}</p>
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
