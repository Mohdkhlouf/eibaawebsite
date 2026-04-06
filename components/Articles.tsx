import React from 'react'
import Link from 'next/link'

type ArticlesProps = {
  data: any[]
}

/**
 * Relaxed-typing Articles component: accepts a plain `any[]` for `data`.
 * This avoids type collisions during a broad migration and keeps the component working
 * while other pieces are converted or types stabilized.
 */
export const Articles = ({ data }: ArticlesProps) => {
  return (
    <section className="notFeaturedArticles">
      <div className="row">
        {data.map((item) => (
          <div className="articles" key={item.id}>
            <Link className="articleLink" href={`/Articles/${item.id}`}>
              <div className="articlesPagearticle" id="article">
                <div className="articlesPageThumbnail">
                  <img
                    src={
                      item.attributes.ArticleThumbnail?.data?.attributes.formats?.thumbnail?.url ??
                      item.attributes.ArticleThumbnail?.data?.attributes.url ??
                      ''
                    }
                    alt={
                      item.attributes.ArticleThumbnail?.data?.attributes.formats?.thumbnail?.url ??
                      item.attributes.ArticleThumbnail?.data?.attributes.url ??
                      'article thumbnail'
                    }
                  />
                </div>

                <div className="articleDetails">
                  <h2 className="articleTitle">{item.attributes.TitleName}</h2>

                  <p className="articlesubtext">
                    {item.attributes.ArticleText ? item.attributes.ArticleText.substring(0, 200) : ''}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
