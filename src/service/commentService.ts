import type { CreateCommentBody, UpdateCommentBody } from '@/shared/types/api/CreateCommentBody';
import type { Comment } from '@/shared/types/Comment';

const isServer = typeof window === 'undefined';
const BASE_URL = isServer ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' : '';

// POST: 댓글 생성
const postComments = async (body: CreateCommentBody): Promise<Comment | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/comments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('댓글 저장 실패');

    const savedComment: Comment = await response.json();
    return savedComment;
  } catch (err) {
    console.error('댓글 등록 실패:', err);
    throw new Error('로그인 상태가 아닙니다');
  }
};

// GET: 댓글 목록 조회 (무한 스크롤)
const getComments = async (
  trackId: number | string,
  nextCursorId?: number
): Promise<{ comments: Comment[]; nextCursorId?: number } | undefined> => {
  try {
    let url = `${BASE_URL}/api/comments?trackId=${trackId}`;
    if (nextCursorId) {
      url += `&nextCursorId=${nextCursorId}`;
    }
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error('댓글 목록 조회 실패:', err);
    throw new Error('댓글 목록 조회 실패');
  }
};

// PUT: 댓글 수정
const putComments = async (
  commentId: number | string,
  body: UpdateCommentBody
): Promise<Comment | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: body.text }),
    });
    if (!res.ok) throw new Error('수정 실패');
    const updatedComment: Comment = await res.json();
    return updatedComment;
  } catch (err) {
    console.error('댓글 수정 실패:', err);
    throw new Error('댓글 수정 실패');
  }
};

// DELETE: 댓글 삭제
const deleteComments = async (commentId: number | string): Promise<void | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('삭제 실패');

    const deleteData = await res.json();
    return deleteData;
  } catch (err) {
    console.error('댓글 삭제 실패:', err);
    throw new Error('댓글 삭제 실패');
  }
};

export const commentsService = {
  postComments,
  getComments,
  putComments,
  deleteComments,
};
