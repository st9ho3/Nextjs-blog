// src/app/_db/setSession.ts
import { cookies } from 'next/headers';
import { UserRecord } from 'firebase-admin/auth'; // Removed trailing comma
import { auth } from './FirebaseAdmin'; // This import triggers initialization in FirebaseAdmin.ts

// Remove or fix this incomplete import:
// import { initializeFirebas} // DELETE THIS LINE

// Create a session cookie
export async function createSessionCookie(idToken: string) {
  // initializeFirebaseAdmin(); // DELETE THIS LINE - Initialization is automatic on import of FirebaseAdmin.ts
  
  // Create a session cookie that expires in 14 days
  const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days in milliseconds
  
  if (!auth) { // Add a check in case auth failed to initialize in FirebaseAdmin.ts
    console.error('Error creating session cookie: Firebase Admin Auth is not available.');
    return { success: false, error: new Error('Firebase Admin Auth is not available.') };
  }

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    // Set the cookie
    (await cookies()).set('session', sessionCookie, { // Removed await from cookies() as it's not a promise here
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict', // 'lax' is also a common choice
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return { success: false, error };
  }
}

// Verify the session cookie and get the user
export async function getUserFromSession(): Promise<UserRecord | null> {
  // initializeFirebaseAdmin(); // DELETE THIS LINE
  
  if (!auth) { // Add a check
    console.error('Error getting user from session: Firebase Admin Auth is not available.');
    return null;
  }

  const sessionCookie = (await cookies()).get('session')?.value;
  
  if (!sessionCookie) {
    return null;
  }
  
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true); // Check for revocation
    const user = await auth.getUser(decodedClaims.uid);
    return user;
  } catch (error) {
    console.warn('Error verifying session cookie or getting user (this can be normal if cookie is invalid/expired):', error);
    return null;
  }
}

// Revoke the session cookie (for logout)
export async function revokeSession() {
  // initializeFirebaseAdmin(); // DELETE THIS LINE

  if (!auth) { // Add a check
    console.error('Error revoking session: Firebase Admin Auth is not available.');
    (await cookies()).delete('session'); // Still try to delete client-side cookie
    return;
  }

  const sessionCookie = (await cookies()).get('session')?.value;
  
  if (sessionCookie) {
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie); // Don't need to checkRevoked here if just revoking
      await auth.revokeRefreshTokens(decodedClaims.sub); // sub is the user's uid
      console.log('Successfully revoked refresh tokens for:', decodedClaims.sub);
    } catch (error) {
      // Log as warning because this can happen if cookie is already invalid
      console.warn('Error revoking refresh tokens (this can be normal if cookie is already invalid):', error);
    }
  }
  
  // Remove the cookie regardless of whether server-side revocation was successful
  (await cookies()).delete('session');
}