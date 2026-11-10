import { NextResponse } from 'next/server';
import { getUserFromRequest } from '../../../../lib/auth';
import { connectDB } from '../../../../lib/db';
import { User } from '../../../../lib/models';
export async function GET() {
  await connectDB();
  const decoded = await getUserFromRequest();
  if (!decoded)
    return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
  const user = await User.findById(decoded.id);
  if (!user)
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({
    user: { id: user._id, username: user.username, email: user.email },
  });
}
