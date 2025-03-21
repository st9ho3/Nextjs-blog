import ArticlePreview from '@/app/(components)/articlePreview'
import React from 'react'
import "./home.css"
import "../../(components)/header.css"
import { getArticles } from '@/app/api/home/route'




const page = async () => {
  const response = await fetch('/api/home')
  return (
    <div className='homepage'>
      <div className='home'>
      {response.map((article) => 
      <ArticlePreview
        key={article.id}
       article={article}
      />
      )}

      </div>
      
    </div>
  )
}

export default page
