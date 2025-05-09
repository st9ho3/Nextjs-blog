import ArticlePreview from '@/app/(components)/articlePreview';
import React, { Suspense } from 'react';
import './home.css';
import '../../(components)/header.css';
import Sidebar from '@/app/(components)/sidebar';
import { getArticles } from '@/app/_lib/utils';

export const revalidate = 60; // Revalidate every 60 seconds

const page = async ({searchParams}: {searchParams: Promise<{type?: string}>}) => {
  const filter = (await searchParams).type;
  const data = await getArticles();

  const articlesTodisplay = filter ?  data.filter((article) => {
    const tags = article.tags.map((tag)=> tag.toLocaleLowerCase())
    return tags.includes(filter)
}) : data
  
  return (
    <div className="homepage">
      <Suspense fallback={<h2>Loading Articles...</h2>}>
      {<div className="home">
        {articlesTodisplay.length > 0 ? articlesTodisplay.map((article: Article) => (
          <ArticlePreview key={article.id} article={article} />
        )): <h2>Loading Articles...</h2> }
      </div>}
      </Suspense>
      <Sidebar /> 
    
    </div>
  );
};

export default page;
