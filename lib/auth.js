import jwt from 'jsonwebtoken';
import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { connectDB } from './db';
import { Blacklist } from './models';

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export async function getUserFromRequest() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;
  await connectDB();
  if (await Blacklist.findOne({ tokenHash: hashToken(token) })) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'carrier-guider-ai',
    });
  } catch {
    return null;
  }
}

export { hashToken };
