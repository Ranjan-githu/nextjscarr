import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../../../lib/db';
import { User } from '../../../../lib/models';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    if (typeof email !== 'string' || typeof password !== 'string')
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 }
      );
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 }
      );
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d', algorithm: 'HS256', issuer: 'carrier-guider-ai' }
    );
    const res = NextResponse.json({
      message: 'User loggedIn successfully.',
      user: { id: user._id, username: user.username, email: user.email },
    });
    res.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return res;
  } catch (error) {
    console.error('Login failed', error);
    return NextResponse.json(
      { message: 'Login could not be completed' },
      { status: 500 }
    );
  }
}
