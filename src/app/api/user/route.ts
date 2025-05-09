// src/app/api/auth/user/route.ts
import { NextResponse } from 'next/server';
import { getUserFromSession } from '@/app/_db/setSession';

export async function GET() {
  try {
    const user = await getUserFromSession();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Return only the data you need on the client
    return NextResponse.json(user/* {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    } */);
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}