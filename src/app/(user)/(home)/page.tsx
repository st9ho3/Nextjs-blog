import ArticlePreview from '@/app/(components)/articlePreview'; 
import React, { Suspense } from 'react'; 
import './home.css'; 
import '../../(components)/header.css'; 
import Sidebar from '@/app/(components)/sidebar'; 
import { getArticles } from '@/app/_lib/utils'; 

// Configures Next.js to revalidate this page every 60 seconds (Incremental Static Regeneration).
export const revalidate = 60; 

// It receives searchParams, which can be used for filtering articles.
const page = async ({searchParams}: {searchParams: Promise<{type?: string}>}) => {
  // Awaits and retrieves the 'type' filter from the search parameters.
  const filter = (await searchParams).type;
  // Fetches all articles using the getArticles utility function.
  const data = await getArticles();

  // Filters the articles if a 'type' filter is present in the searchParams.
  // Otherwise, it displays all articles.
  const articlesTodisplay = filter 
    ? data.filter((article) => { // Filters articles based on the provided tag.
        // Converts all article tags to lowercase for case-insensitive matching.
        const tags = article.tags.map((tag)=> tag.toLocaleLowerCase());
        // Checks if the article's tags include the filter.
        return tags.includes(filter); 
      }) 
    : data; // If no filter, all articles are set to be displayed.
  
  // JSX for the homepage layout.
  return (
    <div className="homepage"> {/* Main container for the homepage. */}
      {/* Suspense component to show a loading message while articles are being fetched. */}
      <Suspense fallback={<h2>Loading Articles...</h2>}>
      {/* Container for the list of articles. */}
      <div className="home">
        {/* Checks if there are articles to display. */}
        {articlesTodisplay.length > 0 
          // Maps over the articles to display and renders an ArticlePreview for each.
          ? articlesTodisplay.map((article: Article) => ( 
            <ArticlePreview key={article.id} article={article} />
          ))
          // If no articles are available (e.g., after filtering or if data is empty), shows a loading/message.
          : <h2>Loading Articles...</h2> } 
      </div>
      </Suspense>
      {/* Renders the Sidebar component. */}
      <Sidebar /> 
    
    </div>
  );
};

export default page; // Exports the Page component.