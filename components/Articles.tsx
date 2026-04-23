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
    <section className="">
      <div className="">
        {data.map((item) => (
          <div className="flex flex-col" key={item.id}>
            <Link className="" href={`/Articles/${item.id}`}>
              <div className="flex flex-row items-center p-2.5" id="article">
                <div className="w-72 h-48">
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
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-70 flex flex-col mr-4 pl-4">
                  <h2 className="text-2xl font-bold">{item.attributes.TitleName}</h2>

                  <p className="text-xl text-justify">
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
