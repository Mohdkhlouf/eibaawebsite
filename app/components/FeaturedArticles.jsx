import React from 'react'
import Link from 'next/link'
export const FeaturedArticles = (props) => {
    const {data}=props
    console.log(data);

  return (
    
    <section className="FeaturedArticles">
      
      
      {data.map((data) => 
                
                
                    
                    <div className="featuredArticle" key={data.id}>
                      <Link href={`/Articles/${data.id}`}> 
                    
                    <div className="FeaturedArticleThumbnail">
                         <img  src={data.attributes.ArticleThumbnail.data?.attributes.url} alt={data.attributes.ArticleThumbnail.data?.attributes.url}/>       
                    </div>      
                        <div className="featuredArticleDetails">
                          
                          <h2 className="FeaturedArticleTitle">{data.attributes.TitleName}
                          </h2>
                         

                         

                          
                          <p className="FeaturedArticleText">{data.attributes.ArticleText.substring(0,200)}
                          
                          </p>
                          </div>

                          </Link>   
                  </div>
                  

                

        )
            
                



        }
        
        
        
        </section>
       
  )
}
