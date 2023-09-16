'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import useFetch from '@/app/Hooks/useFetch'



const ArticleDetailspage = () => {
    
    const pathname=usePathname()
    const { loading, error, data } = useFetch('https://eibaa-5c47424909f6.herokuapp.com/api'+pathname+'?populate=*')

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>
    
    const {attributes}=data
    console.log(attributes)

  return (
    
     <div className="container">
      <section className="articlePageDetails">
          <h2 className="articlePageTitle">{attributes.TitleName}</h2>
          <span>{attributes.ArticleAddDate}</span>
            
          
            <div className="articlePageimg">
              <img src={attributes.ArticleThumbnail.data.attributes.url} alt={attributes.ArticleThumbnail.data.attributes.url}/>
          </div>

          <p className="articlePageText">{attributes.ArticleText}</p>
            
     </section>
      </div>
    
  )
}

export default ArticleDetailspage