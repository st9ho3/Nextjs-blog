// src/app/(user)/[userID]/page.tsx
import React from 'react';
import { getAuthorById } from '@/app/_db/services';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticles } from '@/app/_lib/utils';
import ArticlePreview from '@/app/(components)/articlePreview';
import './profilePage.css';

const ProfilePage = async ({ params }: { params: Promise<{ userID: string }> }) => {
  const { userID } = await params;

  // Fetch author data and articles
  const author = await getAuthorById(userID);
  const allArticles = await getArticles();

  // Handle author not found
  if (!author) {
    notFound();
  }

  // Filter articles for the current author
  const userArticles = allArticles.filter(article => article.author.id === author.id);

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <Image
          className="profile-picture"
          src={author.profilePicture || '/default-profile.png'}
          alt={`${author.name}'s profile picture`}
          width={100}
          height={100}
        />
        <div className="profile-info">
          <h1 className="profile-page-name">{author.name}</h1>
          <p className="profile-bio">{author.bio || 'No bio available.'}</p>
        </div>
      </header>

      <section className="articles-section">
        <h2 className="articles-title">Articles</h2>
        <div className="articles-list">
          {userArticles.length > 0 ? (
            userArticles.map(article => (
              <ArticlePreview key={article.id} article={article} />
            ))
          ) : (
            <p>This author has not published any articles yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
