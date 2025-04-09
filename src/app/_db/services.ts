// src/lib/authors.ts (or services/authors.ts, utils/db.ts, etc.)
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/_db/Firebase"; // Adjust path if needed
import { cache } from 'react'; // Use React cache or Next.js unstable_cache for deduping/caching

// Function to get ALL authors
// Use cache() to deduplicate requests within the same render pass
// and potentially leverage Next.js caching mechanisms more effectively
// depending on where it's called. For longer caching, combine with route segment config or unstable_cache.
export const getAllAuthors = cache(async (): Promise<Author[]> => {
    console.log("Fetching ALL authors from Firestore...");
    try {
        const querySnapshot = await getDocs(collection(db, "authors"));
        const authors: Author[] = [];
        querySnapshot.forEach((doc) => {
            // Include the document ID along with the data
            authors.push({ id: doc.id, ...doc.data() } as Author);
        });
        return authors;
    } catch (error) {
        console.error("Couldn't fetch authors", error);
        // Depending on requirements, you might return [] or throw the error
        // throw new Error("Failed to fetch authors");
        return [];
    }
});

// Function to get a SINGLE author by ID
export const getAuthorById = cache(async (userId: string): Promise<Author | null> => {
    console.log(`Workspaceing author ${userId} from Firestore...`);
    if (!userId) return null; // Handle cases where ID might be missing

    try {
        const docRef = doc(db, "authors", userId); // Or your actual collection name for users/authors
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Author;
        } else {
            console.log(`No author found with ID: ${userId}`);
            return null;
        }
    } catch (error) {
        console.error(`Couldn't fetch author ${userId}`, error);
        // throw new Error("Failed to fetch author data");
        return null;
    }
});
// Function to get a SINGLE article by ID
export const getArticleById = cache(async (articleId: string): Promise<Article | null> => {
    console.log(`Workspaceing article ${articleId} from Firestore...`);
    if (!articleId) return null; // Handle cases where ID might be missing

    try {
        const docRef = doc(db, "articles", articleId); // Or your actual collection name for users/authors
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Article;
        } else {
            console.log(`No article found with ID: ${articleId}`);
            return null;
        }
    } catch (error) {
        console.error(`Couldn't fetch article ${articleId}`, error);
        // throw new Error("Failed to fetch author data");
        return null;
    }
});