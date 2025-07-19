import { NextResponse } from 'next/server';
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

// 댓글 작성
export async function POST(request: Request) {
  await connectToDB();
  const body = await request.json();
  const { userId, trackId, text } = body;
  if (!userId || !trackId || !text) {
    return new Response('필수 필드가 누락되었습니다', { status: 400 });
  }

  const newComment = await Comment.create({ userId, trackId, text });
  return NextResponse.json(newComment, {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
