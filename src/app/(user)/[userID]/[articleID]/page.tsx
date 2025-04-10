// app/(user)/[userID]/[articleID]/page.tsx
import React from "react";
import { getArticleById } from "@/app/_db/services"; // Adjust import path if needed
import { notFound } from 'next/navigation';
import ContentRenderer from "@/app/(components)/htmlRenderer/ContentRenderer";
 
// Next.js page component with correct typing for App Router
export default async function ArticlePage(
  {params}: {
  params: Promise<{
    userID: string;
    articleID: string;
  }>
}) {
  // Destructure articleID from params
  const { articleID } = await params;
  
  // Fetch the article using the database service
  const article = await getArticleById(articleID);
  
  if (!article) {
    notFound(); // Use Next.js 404 helper if article doesn't exist
  }
  
  // Ensure content is a string or fall back to empty string
  const htmlContent = article.content || "";
  
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Optionally display the article title */}
      {article.title && <h1 style={{width: "85%"}}>{article.title}</h1>}
      <hr style={{width: "85%"}}/>
      {/* Render the fetched content */}
      <ContentRenderer content={htmlContent} />
    </main>
  );
}