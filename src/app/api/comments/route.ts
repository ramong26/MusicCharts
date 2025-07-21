import { NextResponse, NextRequest } from 'next/server';
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

  const tokenObj = request.cookies.get('access_token');
  const token = tokenObj?.value;
  if (!token) {
    return new Response('Access token not provided', { status: 401 });
  }

  const profileRes = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!profileRes.ok) {
    return new Response('Failed to fetch Spotify profile', {
      status: profileRes.status,
    });
  }
  const profileData = await profileRes.json();
  const userId = profileData.id;
  const body = await request.json();

  const { trackId, text } = body;

  if (!userId || !trackId || !text) {
    return new Response('필수 필드가 누락되었습니다', { status: 400 });
  }

  const newComment = await Comment.create({
    userId,
    trackId,
    text,
  });

  return NextResponse.json(newComment, {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
