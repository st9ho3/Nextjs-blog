import { collection, setDoc, doc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../_db/Firebase"
import { NextResponse } from "next/server";

/**
 * @description Retrieves all articles from Firestore.
 * @async
 * @function getArticles
 * @returns {Promise<object[]>} A promise that resolves to an array of article data objects.
 * @throws {Error} Throws an error if the document retrieval fails.
 */
export const getArticles = async (): Promise<Article[]> => {
  const querySnapshot = await getDocs(collection(db, "articles"));
  const articles: Article[] = [];

  // Map through the documents and add them to the articles array
  querySnapshot.forEach((doc) => {
     articles.push(doc.data() as Article)
  });
  console.log(articles)
  return articles;
};

export const GET = async (request: Request) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const totalArticles = await getArticles()

    if (id) {
        const article = totalArticles.find((art) => art.id === id);
        if(!article) {
            return NextResponse.json({error:"Article not found"}, {status: 404})
        }
        return article
    }
    return NextResponse.json(totalArticles)
}

