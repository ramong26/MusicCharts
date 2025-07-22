'use client';
import { useState, useEffect } from 'react';

import SubmitInput from '@/shared/components/SubmitInput';
import CommentList from '@/features/tracks/components/CommentList';
import { Comment } from '@/shared/types/Comment';

import { checkLoginStatus } from '@/shared/hooks/checkLoginStatus';

export default function TrackComments({ trackId }: { trackId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [submitComment, setSubmitComment] = useState('');

  const handleSubmit = async (value: string) => {
    if (!value.trim()) {
      console.error('댓글 내용이 비어있습니다');
      return;
    }
    const tempId = 'temp-' + Date.now();
    const tempComment: Comment = {
      _id: tempId,
      trackId,
      text: value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: {
        _id: 'temp-user',
        displayName: '내 닉네임',
        profileImageUrl: '',
      },
    };
    setComments((prev) => [...prev, tempComment]);
    setSubmitComment('');
    try {
      const { isLoggedIn } = await checkLoginStatus();
      if (!isLoggedIn) {
        console.error('로그인 상태가 아닙니다');
        return;
      }
      await fetch('/api/comments', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackId,
          text: value.trim(),
        }),
      });

      setComments((prev) =>
        prev.map((c) => (c._id === tempId ? tempComment : c))
      );
    } catch (err) {
      console.error('댓글 등록 실패:', err);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/comments?trackId=${trackId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [trackId]);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">트랙 댓글</h2>
      <SubmitInput
        placeholder="댓글을 입력하세요"
        onChange={(e) => setSubmitComment(e.target.value)}
        onSubmit={handleSubmit}
        value={submitComment}
      />

      <CommentList comments={comments} />
    </div>
  );
}
