// app/(user)/[userID]/[articleID]/page.tsx
import React from "react";
import { getArticleById, getAuthorById } from "@/app/_db/services"; // Adjust import path if needed
import { notFound } from 'next/navigation';
import ContentRenderer from "@/app/(components)/htmlRenderer/ContentRenderer";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import './articleId.css'; // Import the CSS file

// Next.js page component with correct typing for App Router
export default async function ArticlePage({
  params
}: {
  params: { // Corrected params type - no Promise needed here
    userID: string;
    articleID: string;
  }
}) {
  // Destructure articleID and userID directly from params
  const { articleID, userID } = params;

  // Fetch the article and author using the database services
  // Use Promise.all for potentially parallel fetching
  const [article, author] = await Promise.all([
    getArticleById(articleID),
    getAuthorById(userID)
  ]);

  console.log(author); // Keep logging for debugging if needed

  // Use Next.js 404 helper if article doesn't exist
  if (!article) {
    notFound();
  }

  // Ensure content is a string or fall back to empty string
  const htmlContent = article.content || "";
  const publicationDate = article.metadata?.date || "Date not available"; // Fallback for date

  return (
    <main className="article-page-main">
      {/* Optionally display the article title */}
      {article.title && <h1 className="article-title">{article.title}</h1>}

      <div className="details-bar">
        {/* Author Information Card */}
        <div className="author-details">
          <Image
            className="author-profile-picture"
            src={author?.profilePicture || "/default-profile.png"} // Use fallback directly
            alt={author?.name ? `${author.name}'s profile picture` : "Default profile picture"}
            width={40} // It's recommended to provide width/height for next/image
            height={40}
          />
          <div className="author-info">
            <div className="author-name-follow">
              <div className="author-name">
                {author?.name || "Unknown Author"} {/* Fallback for author name */}
              </div>
              <BsDot />
              <p className="follow-button">follow</p>
            </div>
            {/* Display publication date */}
            <div className="publication-info">
              <p className="publication-date">Published on {publicationDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Render the fetched content */}
      <div className="article-content-container">
         <ContentRenderer content={htmlContent} />
      </div>
    </main>
  );
}