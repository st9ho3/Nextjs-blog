import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {  setDoc, doc} from "firebase/firestore";
import { db } from "./Firebase";

const signUp = async (email: string, password: string): Promise<string> => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
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
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F1737995091638profile4.png?alt=media&token=72d06828-601e-45ad-bf19-d678ee5eca3b",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2Fsam1.png?alt=media&token=4428b127-72c4-4fed-b56a-6c97fe5ef183",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2Fsam2.png?alt=media&token=9940ac8d-94b6-4946-ad0f-2329b6d4b121",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2Fsam3.png?alt=media&token=1a8fe013-ec34-40bb-a792-2b2374e55587",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2Fgeis.png?alt=media&token=fac57ce3-3309-4da1-8941-3073fe515032",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled.png?alt=media&token=81323b56-4a1e-425c-8c6b-68d3ed76aba1",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled%208.png?alt=media&token=4f510dd2-5484-4a4e-be1b-641dcef85216",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled%207.png?alt=media&token=902e91c4-8f51-45d5-a5b5-a17dd23ef233",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled%206.png?alt=media&token=7415cc7f-e044-458f-9e3f-527d9e0dffd1",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled%205.png?alt=media&token=3053b548-d03f-4220-b7d8-cf94758fe839",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled%204.png?alt=media&token=7ca6cd5e-bfed-4815-84bf-d4ca674b1123",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled%203.png?alt=media&token=ab79f3a9-070e-46a3-809f-5755001cc7f4",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2FUntitled%202.png?alt=media&token=f90aab98-d53f-467d-a0b8-6c963cc462c5",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F9.png?alt=media&token=b6258895-8d76-48ea-bfe6-0e7aaaaf797f",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F12.png?alt=media&token=931d4536-0fe2-4dfd-b750-9addc470de6e",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F12.png?alt=media&token=931d4536-0fe2-4dfd-b750-9addc470de6e",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F11.png?alt=media&token=bebd3c82-84b2-402f-ab3c-b49168d1a8ae",
      "https://firebasestorage.googleapis.com/v0/b/the-notes-app-cfe0c.appspot.com/o/images%2F10.png?alt=media&token=d26c685c-8a56-4de3-81c5-7abb2f4a07d9",
    ];
    const now = new Date()
    function getRandom0To3(): number {
      return Math.floor(Math.random() * 21);
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

  export const registerUser = async (email: string, password: string, name: string): Promise<string> => {
    // Sign up the user with Firebase Auth and get a unique ID
    const id = await signUp(email, password);
    // Create the new author object
    const newUser = createAuthorObject(id, name);
    
  
    // Save the user to Firestore
    await setDoc(doc(db, "authors", id), newUser);
    return id
  };

  export const signIn = async (email: string, password: string): Promise<string> => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        // You can also fetch user data from Firestore here if needed
        return user.uid
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-in error:', errorCode, errorMessage);
        throw error; // Re-throw the error for handling in the calling code
      });
  }