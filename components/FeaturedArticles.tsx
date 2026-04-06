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

    <section className="FeaturedArticles">


      {data.map((item, index) => (



        <div className="featuredArticle" key={item.id ?? index}>
          <Link href={`/Articles/${item.id}`}>

            <div className="FeaturedArticleThumbnail">
              <img src={item.attributes.ArticleThumbnail.data?.attributes.url} alt={item.attributes.ArticleThumbnail.data?.attributes.url} />
            </div>
            <div className="featuredArticleDetails">

              <h2 className="FeaturedArticleTitle">{item.attributes.TitleName}
              </h2>

              <p className="FeaturedArticleText">{item.attributes.ArticleText.substring(0, 200)}

              </p>
            </div>

          </Link>
        </div>




      ))}



    </section>

  )
}
