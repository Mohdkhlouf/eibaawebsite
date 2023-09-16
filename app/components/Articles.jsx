import React from 'react'
import Link from 'next/link'
export const Articles = (props) => {

    const {data}=props
    

  return (
    <section className="notFeaturedArticles">
        <div className="row">
      

    {data.map((data) => 
            <div className="articles">
                <Link className="articleLink" href={`/Articles/${data.id}`}>
                <div className="articlesPagearticle" id="article" key={data.id}>
                    
                    
                        <div className="articlesPageThumbnail">

                        <img src={data.attributes.ArticleThumbnail.data?.attributes.formats.thumbnail.url} alt={data.attributes.ArticleThumbnail.data?.attributes.formats.thumbnail.url}/>

                        </div>

                        <div className="articleDetails">
                            <h2 className="articleTitle">{data.attributes.TitleName}</h2>
                            
                            <p className="articlesubtext">{data.attributes.ArticleText.substring(0,200)}
                            </p>
                        </div>

                        </div> 
                        </Link>

                       
                        


                                    </div>

                                     

                            )
                                
                                    



                            }
    </div>
    </section>
   
  )
}
