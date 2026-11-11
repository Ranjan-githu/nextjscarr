import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';
import { Feedback } from '../../../lib/models';

async function getFeedbackState(userId) {
  const [entries, userFeedback, [summary]] = await Promise.all([
    Feedback.find()
      .sort({ updatedAt: -1 })
      .limit(100)
      .populate('user', 'username')
      .select('rating comment createdAt updatedAt'),
    Feedback.findOne({ user: userId }).select(
      'rating comment createdAt updatedAt'
    ),
    Feedback.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]),
  ]);

  const serialize = (entry) => ({
    rating: entry.rating,
    comment: entry.comment,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  });

  return {
    feedback: entries.map((entry) => ({
      ...serialize(entry),
      username: entry.user?.username || 'Former user',
    })),
    myFeedback: userFeedback ? serialize(userFeedback) : null,
    averageRating: summary?.averageRating || 0,
    totalReviews: summary?.totalReviews || 0,
  };
}

function unauthorized() {
  return NextResponse.json(
    { message: 'Please log in to view and submit feedback.' },
    { status: 401, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function GET() {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    return NextResponse.json(await getFeedbackState(user.id), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Failed to load feedback', error);
    return NextResponse.json(
      { message: 'Feedback could not be loaded. Please try again.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return unauthorized();

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: 'Please submit valid JSON feedback.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const { rating, comment } = body || {};
    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      typeof comment !== 'string' ||
      comment.length > 1000 ||
      !comment.trim()
    ) {
      return NextResponse.json(
        {
          message:
            'Choose a star rating and enter a comment of up to 1000 characters.',
        },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    await Feedback.findOneAndUpdate(
      { user: user.id },
      { $set: { rating, comment: comment.trim() } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(await getFeedbackState(user.id), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Failed to save feedback', error);
    return NextResponse.json(
      { message: 'Feedback could not be saved. Please try again.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
