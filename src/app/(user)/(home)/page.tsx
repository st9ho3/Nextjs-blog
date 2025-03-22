import ArticlePreview from '@/app/(components)/articlePreview';
import React from 'react';
import './home.css';
import '../../(components)/header.css';
import { getAuthors } from '@/app/_lib/utils';
import TopWriters from '@/app/(components)/topWriters';

async function getHomeData(): Promise<Article[]> {
  const res = await fetch('http://localhost:3000/api/articles', {
    cache: 'force-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const page = async () => {
  const data = await getHomeData();

  return (
    <div className="homepage">
      <div className="home">
        {data.map((article) => (
          <ArticlePreview key={article.id} article={article} />
        ))}
      </div>
      <TopWriters />
    </div>
  );
};

export default page;
