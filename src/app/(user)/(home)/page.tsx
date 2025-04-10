import ArticlePreview from '@/app/(components)/articlePreview';
import React from 'react';
import './home.css';
import '../../(components)/header.css';
import Sidebar from '@/app/(components)/sidebar';
import { getArticles } from '@/app/_lib/utils';


const page = async () => {
  const data = await getArticles();
  return (
    <div className="homepage">
      {<div className="home">
        {data.length > 0 ? data.map((article) => (
          <ArticlePreview key={article.id} article={article} />
        )): <h2>Loading Articles...</h2> }
      </div>}
      <Sidebar /> 
    
    </div>
  );
};

export default page;
