import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {  setDoc, doc} from "firebase/firestore";
import { db } from "./Firebase";

const signUp = async (email: string, password: string): Promise<string> => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log('User registered:', user);
      return user.uid
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Registration error:', errorCode, errorMessage);
      throw error; // Re-throw the error for handling in the calling code
    });
};

const createAuthorObject = (userid: string, name: string): Author => {
    const possibleNames: string[] = [
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F1737994837627profile2.png?alt=media&token=b95062e9-5880-404f-a66e-c257898bb36e",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F1737994768589profile1.png?alt=media&token=00e935ed-e88e-4e6c-8d85-643c069407a4",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F1737995076503profile3.png?alt=media&token=71ae0765-afd6-470b-bf4e-b712deb294c1",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F1737995091638profile4.png?alt=media&token=72d06828-601e-45ad-bf19-d678ee5eca3b"
    ];
    const now = new Date()
    function getRandom0To3(): number {
      return Math.floor(Math.random() * 4);
    }
    const randomIndex = getRandom0To3()
    const author: Author = {
      id: userid, // Unique ID for the author
      name: name, // Author's full name
      email: "", // Author's email
      password: "", // Hashed password for security
      profilePicture: possibleNames[randomIndex], // URL to profile picture
      bio: "", // Short bio
      articles: [], // Array of article IDs written by the author
      categories: [], // Categories the author is interested in
      socialLinks: {
        twitter: "",
        linkedin: "",
        github: "",
      },
      createdAt: now.toISOString(), // Timestamp when the author profile was created
      updatedAt: now.toISOString(), // Timestamp when the author profile was last updated
    };
  
    return author
  }

  export const registerUser = async (email: string, password: string, name: string): Promise<void> => {
    // Sign up the user with Firebase Auth and get a unique ID
    const id = await signUp(email, password);
    console.log("Firebase user ID:", id);
  
    // Create the new author object
    const newUser = createAuthorObject(id, name);
    console.log("New Author Object:", newUser);
  
    // Save the user to Firestore
    await setDoc(doc(db, "authors", id), newUser);
    console.log("User registered with Firestore document ID:", id);
  };