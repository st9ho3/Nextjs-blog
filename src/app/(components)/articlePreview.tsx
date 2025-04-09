import React from 'react';
import Link from 'next/link';
import { FaHandsClapping, FaRegBookmark } from 'react-icons/fa6';
import { FaComment } from 'react-icons/fa';
import Tag from './tag';
import './articlePreview.css';
import { getImage, getSubTitles } from '../_lib/utils';
import Image from 'next/image';

const ArticlePreview = ({ article }: { article: Article }) => {
  const title = article.title
  const subtitle = getSubTitles(article);
  const image = getImage(article);
  

  return (
    <div className="home-header-container">
      <div className="home-header">
        <div className="info-container">
          <Image
            width={50}
            height={50}
            className="profile-info-pic"
            src={article.author?.img}
            alt="profile-pic"
          />
          <span className="by">by</span>
          {/* Profile link */}
          <Link
            href={`${article.author?.name || 'Unknown'}`}
            className="profile-name"
          >
            {article.author?.name || 'Unknown'}
          </Link>
          {article.tags.slice(0, 2).map((cat) => (
            <Tag key={cat} text={cat} />
          ))}
        </div>

        {/* Article link */}
        <Link
          href={`/${article.author.name}/${article.id}`}
          className="article-link"
        >
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
              <span className="social-number">
                {article?.comments?.length || 0}
              </span>
            </div>
            <div className="social-container">
              <FaRegBookmark className="social-icon" />
              <span className="social-number">{article.saves}</span>
            </div>
          </div>
        </Link>
      </div>
      {/* Article image link */}
      { image !== "No image" && <Link
        href={`/${article.author.name}/${article.id}`}
        className="image-link"
      >
       <Image className="article-image" width={150} height={150} src={image} alt="article image" /> 
      </Link>}
    </div>
  );
};

export default ArticlePreview;
