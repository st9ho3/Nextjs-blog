// app/(user)/[userID]/page.tsx
import React from 'react';

const ProfilePage = async ({ params }: { params: Promise<{ userID: string }>}) => {
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
      <p>User Profile: {userID}</p>
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