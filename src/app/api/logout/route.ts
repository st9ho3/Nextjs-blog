// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { revokeSession } from '@/app/_db/setSession';

export async function POST() {
  await revokeSession();
  return NextResponse.json({ success: true });
}
