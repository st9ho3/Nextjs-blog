// app/(user)/[userID]/page.tsx
import React from 'react';
// Import functions to get user data and user's articles if needed
// import { getUserData, getArticlesByUserId } from '@/app/_db/services';

const ProfilePage = async ({ params }: { params: { userID: string } }) => {
  const { userID } = await params; // No await needed for params

  // Fetch user data based on userId (you'll need a service function for this)
  // const user = await getUserData(userId);
  // const userArticles = await getArticlesByUserId(userId);

  // Handle user not found
  // if (!user) {
  //   notFound();
  // }

  return (
    <div>
      {/* Replace with actual user data */}
      <h1>User Profile: {userID}</h1>
      {/* Display user details */}
      {/* Display list of user's articles, linking to /userId/articleId */}
      {/* Example:
         <ul>
           {userArticles.map(article => (
             <li key={article.id}>
               <Link href={`/${userId}/${article.id}`}>{article.title}</Link>
             </li>
           ))}
         </ul>
      */}
    </div>
  );
};

export default ProfilePage;