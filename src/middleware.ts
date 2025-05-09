// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const session = (await cookies()).get('session')?.value;
  
  // Paths that require authentication
  const authRequiredPaths = [
    '/:path*',
    '/write',
  ];
  
  // Check if the current path requires authentication
  const pathRequiresAuth = authRequiredPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // If accessing a protected route without a session, redirect to login
  if (pathRequiresAuth && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If accessing login/register with a session, redirect to dashboard
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    '/write',
    '/',
    '/:path*',
    '/login',
    '/register',
  ],
};