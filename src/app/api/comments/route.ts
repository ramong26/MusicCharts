import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDB from '@/lib/mongo/mongo';
import { Comment } from '@/lib/mongo/models/Comment';

// 댓글 목록 가져오기
export async function GET(request: Request) {
  await connectToDB();
  const url = new URL(request.url);
  const trackId = url.searchParams.get('trackId');
  if (!trackId) {
    return new Response('트랙 ID가 필요합니다', { status: 400 });
  }
  const comments = await Comment.find({ trackId }).sort({ createdAt: -1 });
  return NextResponse.json(comments, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: NextRequest) {
  await connectToDB();

  const token = request.cookies.get('jwt')?.value;
  if (!token) {
    return new Response('JWT not provided', { status: 401 });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret!) as {
      userId: string;
    };
    const userId = decoded.userId;

    const { trackId, text } = await request.json();
    if (!trackId || !text) {
      return new Response('트랙 ID와 댓글 내용이 필요합니다', { status: 400 });
    }

    const newComment = await Comment.create({ userId, trackId, text });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('에러 발생 jwt 토큰이 없습니다:', error);
    return new Response('Invalid JWT token', { status: 401 });
  }
}
