// src/lib/FirebaseAdmin.ts (or src/app/_db/FirebaseAdmin.ts or src/lib/session.ts)
import * as admin from 'firebase-admin';

// **Important:** Ensure these environment variable names EXACTLY match what's in your .env.local file.
// The error snippet used FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, etc.
// If your .env.local uses FIREBASE_ADMIN_PROJECT_ID, adjust these constants accordingly.
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let app: admin.app.App;

if (!admin.apps.length) {
  if (projectId && clientEmail && privateKey) {
    try {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        // Optionally, add your databaseURL if you use RTDB with Admin SDK
        // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      });
      console.log("Firebase Admin SDK Initialized successfully (FirebaseAdmin.ts)");
    } catch (error: unknown) {
      console.error("Firebase Admin SDK initialization error IN FirebaseAdmin.ts:", error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error.stack : '');
      // If initialization fails, 'app' will be undefined, and trying to use admin.auth() later will also fail.
    }
  } else {
    console.warn(
      "Firebase Admin SDK: Missing one or more environment variables for initialization (PROJECT_ID, CLIENT_EMAIL, or PRIVATE_KEY). SDK will not be initialized."
    );
  }
} else {
  app = admin.apps[0] as admin.app.App; // Use the existing app
  console.log("Firebase Admin SDK already initialized (FirebaseAdmin.ts).");
}

// Export auth after the initialization block.
// It's good practice to ensure 'app' is defined before trying to use admin.auth().
let authInstance: admin.auth.Auth;

if (app!) { // Check if app was successfully initialized or retrieved
  try {
    authInstance = admin.auth(app); // Get auth for the specific app instance
  } catch (error) {
    console.error("Error getting admin.auth() instance even after app initialization check:", error);
    // @ts-expect-error // Suppress TS error if authInstance might not be assigned.
    authInstance = undefined;
  }
} else {
  console.error("Firebase Admin App was not initialized. Auth service will not be available.");
  // @ts-expect-error // Suppress TS error if authInstance might not be assigned.
  authInstance = undefined;
}

export const auth = authInstance; // This could be undefined if initialization failed.
export { app as adminApp }; // Export the initialized app instance if needed
export default admin; // You can also export the entire admin namespace