import React from "react"; 
import { getArticleById, getAuthorById } from "@/app/_db/services"; 
import { notFound } from 'next/navigation'; 
import Image from 'next/image';
import ContentRenderer from "@/app/(components)/htmlRenderer/ContentRenderer"; 
import { BsDot } from "react-icons/bs"; 
import { FaHandsClapping, FaRegBookmark } from 'react-icons/fa6'; 
import { FaComment } from 'react-icons/fa'; 
import './articleId.css'; 

export default async function ArticlePage({
  params // Props containing the dynamic route parameters (userID and articleID).
}: {
  params: Promise<{ 
    userID: string; // The ID of the article's author.
    articleID: string; // The ID of the article.
  }>
}) {
  // Destructures articleID and userID directly from the resolved params.
  const { articleID, userID } = await params;

  // Fetches the article and author data concurrently using Promise.all for efficiency.
  const [article, author] = await Promise.all([
    getArticleById(articleID), // Fetches the article data based on articleID./[articleID]/page.tsx]
    getAuthorById(userID) // Fetches the author data based on userID./[articleID]/page.tsx]
  ]);


  // If the article is not found, triggers a 404 page.
  if (!article) {
    notFound(); // Renders the Next.js default 404 page./[articleID]/page.tsx]
  }

  // Ensures article content is a string (or an array of blocks for ContentRenderer); provides a fallback.
  // The `ContentRenderer` likely expects an array of blocks, so `article.content` is used directly.
  const htmlContent = article.content || ""; // Assuming article.content holds the block data./[articleID]/page.tsx]
  // Retrieves the publication date from article metadata, with a fallback.
  const publicationDate = article.metadata?.date || "Date not available"; 

  // JSX for the article page layout.
  return (
    <main className="article-page-main"> {/* Main container for the article page. */}
      {/* Optionally displays the article title if it exists. */}
      {article.title && <h1 className="article-title">{article.title}</h1>}

      {/* Bar displaying author details and social interaction icons. */}
      <div className="details-bar">
        {/* Author Information Card section. */}
        <div className="author-details">
          <Image
            className="author-profile-picture"
            src={author?.profilePicture || "/default-profile.png"} // Displays author's profile picture or a default one./[articleID]/page.tsx]
            alt={author?.name ? `${author.name}'s profile picture` : "Default profile picture"} // Alt text for the image.
            width={40} 
            height={40} 
          />
          <div className="author-info"> {/* Container for author's name and publication info. */}
            <div className="author-name-follow"> {/* Container for author's name and follow button. */}
              <div className="author-name">
                {author?.name || "Unknown Author"} {/* Displays author's name or "Unknown Author". */}
              </div>
              <BsDot /> {/* Dot separator icon. */}
              <p className="follow-button">follow</p> {/* Placeholder for follow functionality. */}
            </div>
            {/* Displays the publication date of the article. */}
            <div className="publication-info">
              <p className="publication-date">Published on {publicationDate}</p>
            </div>
          </div>
        </div>
        {/* Container for social interaction icons (likes, comments, saves). */}
        <div className="social-icons article-social-icons">
          <div className="social-container"> {/* Likes count. */}
            <FaHandsClapping className="social-icon article-social-icon" />
            <span className="social-number article-number">{article?.likes || 0}</span>
          </div>
          <div className="social-container"> {/* Comments count. */}
            <FaComment className="social-icon article-social-icon" />
            <span className="social-number article-number">
              {article?.comments?.length || 0}
            </span>
          </div>
          <div className="social-container"> {/* Saves count. */}
            <FaRegBookmark className="social-icon article-social-icon" />
            <span className="social-number article-number">{article.saves}</span>
          </div>
        </div>
      </div>

      {/* Container for rendering the main article content. */}
      <div className="article-content-container">
         {/* Renders the article content using the ContentRenderer component.*/}
         <ContentRenderer content={htmlContent as []} /> 
      </div>
    </main>
  );
}