import { collection, setDoc, doc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../_db/Firebase"
import { NextResponse } from "next/server";

export const getAuthors = async (): Promise<Author[]> => {
    const querySnapshot = await getDocs(collection(db, "authors"));
    const authors: Author[] = [];

    // Iterate through the documents and add each one to the authors array
    querySnapshot.forEach((doc) => {
        authors.push(doc.data() as Author);
    });
    console.log(authors)

    return authors;
};

export const GET = async () => {
    try {
        // Fetch the list of authors
        const authors: Author[] = await getAuthors();

        // Return the authors as a JSON response
        return NextResponse.json(authors);
    } catch (error) {
        // Log the error if the data couldn't be fetched
        console.error("Couldn't fetch data", error);
    }
};
