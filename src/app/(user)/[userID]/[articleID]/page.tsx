// app/(user)/[userID]/[articleID]/page.tsx
import React from "react";
import { getArticleById, getAuthorById } from "@/app/_db/services"; // Adjust import path if needed
import { notFound } from 'next/navigation';
import ContentRenderer from "@/app/(components)/htmlRenderer/ContentRenderer";
import { BsDot } from "react-icons/bs"; 
import Image from "next/image";

// Next.js page component with correct typing for App Router
export default async function ArticlePage(
  {params}: {
  params: Promise<{
    userID: string;
    articleID: string;
  }>
}) {
  // Destructure articleID from params
  const { articleID, userID } = await params;
  
  // Fetch the article using the database service
  const article = await getArticleById(articleID);
  const author = await getAuthorById(userID);
  console.log(author)
  if (!article) {
    notFound(); // Use Next.js 404 helper if article doesn't exist
  }
  
  // Ensure content is a string or fall back to empty string
  const htmlContent = article.content || "";
  
  return (
    <main style={{ padding: '2rem', maxWidth: '850px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Optionally display the article title */}
      {article.title && <h1 style={{width: "85%", marginBottom: "1rem", fontSize:"2.6rem"}}>{article.title}</h1>}
      
        <div className="detailsBar" style={{width: "85%",borderTop: "1px solid lightgray" ,borderBottom: "1px solid lightgray"}}>

        
        {/* Author Information Card */}
                <div className="author-details" style={{
                  display: 'flex',
                  gap: '1rem',
                  fontFamily: 'Inter',
                  margin: '0.2rem ',
                  
                }}>
                  <Image
                    style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }}
                    src={author ? author?.profilePicture : "/default-profile.png"}
                    alt="profile-picture"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', color: "rgb(55,55,55)" }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ fontFamily: 'Inter, HELVETICA', fontSize: ".9rem" }}>
                        {author?.name}
                      </div>
                      <BsDot />
                      <p style={{cursor: "pointer"}}>follow</p>
                    </div>
                    {/* Static publication date - consider making dynamic */}
                    <div>
                      <p style={{fontSize: ".9rem", marginTop: '.3rem'}}>Published on {article.metadata.date}</p>
                    </div>
                  </div>
                </div>
                </div>
      
      {/* Render the fetched content */}
      <ContentRenderer content={htmlContent} />
    </main>
  );
}