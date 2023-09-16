import React from 'react'
import useFetch from '../Hooks/useFetch'
import Link from 'next/link'

export const Blog = () => {

    const { loading, error, data } = useFetch('https://eibaa-5c47424909f6.herokuapp.com/api/articles?sort=ArticleAddDate:desc&populate=*')

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
                    {data.slice(0,3).map((post) => (
                      <div className="col-md-4">
            <div className="homePageArticle" key={post.id}>
            <Link href={`/Articles/${post.id}`}>  
           <div className="homePageArticleimg">
            <img src={post.attributes.ArticleThumbnail.data?.attributes.formats.thumbnail.url} alt={post.attributes.ArticleThumbnail.data?.attributes.formats.thumbnail.name}/> 
          </div>
              <div className="homePageArticleTitle">
              <h2 >{post.attributes.TitleName}</h2>
                </div>
              <p className="homePageArticleText">{post.attributes.ArticleText.substring(0,200)}</p>
              </Link>
            </div>

            </div>

          ))
        }
  </div>                     

                       </div>
    </div>
  )
}



   