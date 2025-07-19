import { NextResponse } from 'next/server';
import connectToDB from '@/lib/mongo/mongo';
import { Comment } from '@/lib/mongo/models/Comment';

// 댓글 수정
export async function PATCH(request: Request) {
  await connectToDB();
  const body = await request.json();
  const { commentId, text } = body;

  if (!commentId || !text) {
    return new Response('필수 필드가 누락되었습니다', { status: 400 });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { text, updatedAt: new Date() },
    { new: true }
  );

  if (!updatedComment) {
    return new Response('댓글을 찾을 수 없습니다', { status: 404 });
  }

  return NextResponse.json(updatedComment, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 댓글 삭제
export async function DELETE(request: Request) {
  await connectToDB();
  const body = await request.json();
  const { commentId } = body;

  if (!commentId) {
    return new Response('댓글 ID가 필요합니다', { status: 400 });
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    return new Response('댓글을 찾을 수 없습니다', { status: 404 });
  }

  return NextResponse.json(
    { message: '댓글이 삭제되었습니다' },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
