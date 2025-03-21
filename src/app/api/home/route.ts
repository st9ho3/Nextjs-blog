import { collection, setDoc, doc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../db/Firebase"
import { get } from "http";
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
  const articles: any[] = [];

  // Map through the documents and add them to the articles array
  querySnapshot.forEach((doc) => {
     articles.push(doc.data())
  });
  console.log(articles)
  return articles;
};

/**
 * @description Retrieves a specific article from Firestore by its ID.
 * @async
 * @function getArticle
 * @param {string} id - The ID of the article to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the article data if found, or null if not found.
 * @throws {Error} Throws an error if the document retrieval fails.
 */

export const getArticle = async (id: string) => {
  try {
    const docRef = doc(db, "articles", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No document found with ID:", id);
      return null;
    }

    // Get raw data and desanitize
    const rawData = docSnap.data();
    const desanitizedData = desanitizeFromFirestore(rawData);

    // Return the processed data with document ID
    return {
      id: docSnap.id,
      ...desanitizedData,
      createdAt: rawData.createdAt?.toDate?.(), // Safe conversion
      updatedAt: rawData.updatedAt?.toDate?.()
    };

  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to retrieve article. Please try again later.");
  }
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

