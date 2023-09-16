'use client'

import React from 'react'
import useFetch from '../Hooks/useFetch'
import Link from 'next/link'
import { FeaturedArticles } from '../components/FeaturedArticles'
import { Articles } from '../components/Articles'




const Articlespage = ({}) => {

    const { loading, error, data } = useFetch('https://eibaa-5c47424909f6.herokuapp.com/api/articles?populate=*')

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>
  
    const featuredData=data.slice(0,2);
    const notFeaturedData=data.slice(2,);
    

    

  return (
    
    <div className="container">
      <FeaturedArticles data={featuredData}/>
      <Articles data={notFeaturedData}/>
      
     
      </div>
                   
  )
}

export default Articlespage


