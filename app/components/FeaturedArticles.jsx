import React from 'react'
import Link from 'next/link'
export const FeaturedArticles = (props) => {
    const {data}=props
    console.log(data);

  return (
    <section className="FeaturedArticles">
      
      
      {data.map((data) => 
                
                <Link href={`/Articles/${data.id}`}> 
                    
                    <div className="featuredArticle" key={data.id}>
                    
                    <div className="FeaturedArticleThumbnail">                  
                    </div>      
                        <div className="featuredArticleDetails">
                          
                          <h2 className="FeaturedArticleTitle">{data.attributes.TitleName}
                          </h2>
                         

                          <img  src={data.attributes.ArticleThumbnail.data?.attributes.url} alt={data.attributes.ArticleThumbnail.data?.attributes.url}/>

                          
                          <p className="FeaturedArticleText">{data.attributes.ArticleText.substring(0,200)}
                          
                          </p>
                          </div>

                          
                  </div>
                  </Link>

                

        )
            
                



        }
        
        
        
        </section>
  )
}
