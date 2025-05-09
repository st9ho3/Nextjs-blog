// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookie } from '@/app/_db/setSession';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID token' }, { status: 400 });
    }
    
    const result = await createSessionCookie(idToken);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: 401 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

