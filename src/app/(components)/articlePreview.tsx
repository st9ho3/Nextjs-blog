import React from 'react'
import Link from 'next/link';
import { FaHandsClapping, FaRegBookmark } from 'react-icons/fa6';
import { FaComment } from 'react-icons/fa';
import Tag from './tag';
import "./articlePreview.css"
import { getImage, getSubTitles, getTitles } from '../_lib/utils';

const ArticlePreview = ({article}: {article: Article}) => {

  const title = getTitles(article)
  const subtitle = getSubTitles(article)
  const image = getImage(article)


  return (
    <div
         className="home-header-container"
       >
         <div className="home-header">
           <div className="info-container">
             <img className="profile-info-pic" src={article.author?.img} alt="profile-pic" /> 
             <span className="by">by</span>
             {/* Profile link */}
             <Link href={`${article.author?.name || 'Unknown'}`} className="profile-name">
               {article.author?.name || 'Unknown'}
             </Link>
             {article.tags.slice(0,2).map((cat) => (
               <Tag key={cat} text={cat} />
             ))}
           </div>
   
           {/* Article link */}
           <Link href={`${article.author?.name || 'Unknown'}/${article.id}`} className="article-link">
             <h1 className="title">{title}</h1>
             <p className="subtitle">{subtitle}</p>
   
             <div className="social-icons">
               <p className="social-icon date">{article.date}</p>
               <div className="social-container">
                 <FaHandsClapping className="social-icon" />
                 <span className="social-number">{article?.likes || 0}</span>
               </div>
               <div className="social-container">
                 <FaComment className="social-icon" />
                 <span className="social-number">{article?.comments?.length || 0}</span>
               </div>
               <div className="social-container">
                 <FaRegBookmark className="social-icon" />
                 <span className="social-number">{article.saves}</span>
               </div>
             </div>
           </Link>
         </div>
         <Link href={`${article.author?.name || 'Unknown'}/${article.id}`} className="image-link">
           <img className="article-image" src={image} alt="article image" />
         </Link>
         {/* Article image link */}
         
   
       </div>
  )
}

export default ArticlePreview
