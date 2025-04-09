// app/(user)/[userId]/[articleID]/page.tsx
import React from "react";
import { getArticleById } from "@/app/_db/services"; // Adjust import path if needed
import { notFound } from 'next/navigation'; // Import notFound
import { ServerBlockNoteEditor } from '@blocknote/server-util'; // <-- Import server editor
import { PartialBlock } from "@blocknote/core"; // <-- Import Block type if needed
import ContentRenderer from "../../test/ContentRenderer";


// No need for the API fetch function here anymore

const ArticlePage = async ({ params }: { params: { userId: string, articleID: string } }) => {
  // Destructure articleID directly from params
  const { articleID } = await params; 

  // Fetch the article DIRECTLY using the database service
  const article: Article | null = await getArticleById(articleID);

  if (!article) {
    notFound(); // Use Next.js 404 helper if article doesn't exist
  }

  // --- Server-side HTML Generation ---
  let htmlContent = article.content || null; // Fallback to null if content is empty
  

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
    <h1>Rendered Content</h1>
    <hr />
    <ContentRenderer content={htmlContent} />
  </main>
  );
};

export default ArticlePage;