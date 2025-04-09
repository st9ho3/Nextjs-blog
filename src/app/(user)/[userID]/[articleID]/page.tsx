// app/(user)/[userId]/[articleID]/page.tsx
import React from "react";
import { getArticleById } from "@/app/_db/services"; // Adjust import path if needed
// import { generateHtmlFromBlocks } from "@/app/_lib/blockNote-server"; // Uncomment when ready
// import { ServerBlockNoteEditor } from "@blocknote/server-util"; // Uncomment when ready
import { notFound } from 'next/navigation'; // Import notFound

// Params now include both userId and articleID
const ArticlePage = async ({ params }: { params: { userID: string, articleID: string } }) => {
  const { userID, articleID } = await params; // Destructure both

  console.log(`Fetching article for User: ${userID}, Article ID: ${articleID}`); // For debugging

  // Fetch the article using articleID
  const article: Article | null | undefined = await getArticleById(articleID);

  if (!article) {
    notFound(); // Use Next.js 404 helper
  }

  // --- Server-side HTML Generation (Keep your existing logic) ---
  // Ensure article.content is the correct type for generateHtmlFromBlocks
  // const htmlContent = article.content ? generateHtmlFromBlocks(article.content) : null;
  const htmlContent = 'Loading...'; // Placeholder - Replace with actual generation

  // Optional: You could fetch user data using userId if needed on this page
  // const authorData = await getUserData(userId); // Example

  return (
    <article>
      <h1>{article.title || `Article ${articleID}`}</h1>
      {/* You can add author info here, possibly confirming it matches userId if needed */}
      <p>Author Route Param: {userID}</p> {/* Example showing userId */}
      {/* TODO: Add author, date, tags etc. here */}
      <div className="mt-4">
        {htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
          <p>Loading content or content is empty...</p>
        )}
      </div>
    </article>
  );
};

export default ArticlePage;