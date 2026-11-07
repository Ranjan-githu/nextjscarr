import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB } from '../../../../lib/db';
import { Blacklist } from '../../../../lib/models';
import { hashToken } from '../../../../lib/auth';

export async function POST() {
  await connectDB();
  const token = (await cookies()).get('token')?.value;
  if (token) await Blacklist.create({ tokenHash: hashToken(token), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) });
  const res = NextResponse.json({ message: 'User logged out successfully' });
  res.cookies.set('token', '', { path: '/', maxAge: 0, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  return res;
}
