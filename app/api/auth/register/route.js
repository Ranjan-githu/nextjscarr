import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../../../lib/db';
import { User } from '../../../../lib/models';

export async function POST(request) {
  try {
    await connectDB();
    const { username, email, password } = await request.json();
    if (!username || !email || !password)
      return NextResponse.json(
        { message: 'Please provide username, email and password' },
        { status: 400 }
      );
    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    )
      return NextResponse.json(
        { message: 'Invalid registration data' },
        { status: 400 }
      );
    if (password.length < 6 || username.length > 50 || email.length > 254)
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    if (await User.findOne({ $or: [{ username }, { email }] }))
      return NextResponse.json(
        { message: 'An account already uses this username or email' },
        { status: 400 }
      );
    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 12),
    });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d', algorithm: 'HS256', issuer: 'carrier-guider-ai' }
    );
    const res = NextResponse.json(
      {
        message: 'User registered successfully',
        user: { id: user._id, username: user.username, email: user.email },
      },
      { status: 201 }
    );
    res.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return res;
  } catch (error) {
    console.error('Registration failed', error);
    return NextResponse.json(
      { message: 'Registration could not be completed' },
      { status: 500 }
    );
  }
}
