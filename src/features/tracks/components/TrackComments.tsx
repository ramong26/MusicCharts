'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import SubmitInput from '@/shared/components/SubmitInput';
import CommentList from '@/features/tracks/components/CommentList';

import { commentsService } from '@/service/commentService';
import { Comment } from '@/shared/types/Comment';
import { checkLoginStatus } from '@/shared/hooks/checkLoginStatus';

export default function TrackComments({ trackId }: { trackId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [submitComment, setSubmitComment] = useState('');

  // 댓글 제출 핸들러
  const handleSubmit = async (value: string) => {
    const { isLoggedIn } = await checkLoginStatus();
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
        displayName: 'Anonymous',
        profileImageUrl: '',
      },
    };
    setComments((prev) => [...prev, tempComment]);
    setSubmitComment('');

    try {
      if (!isLoggedIn) {
        console.error('로그인 상태가 아닙니다');
        setComments((prev) => prev.filter((c) => c._id !== tempId));
        return;
      }
      const res = await commentsService.postComments({
        trackId,
        text: value.trim(),
      });

      if (!res) throw new Error('댓글 저장 실패');

      const savedComment: Comment = res as Comment;

      setComments((prev) => prev.map((c) => (c._id === tempId ? savedComment : c)));
    } catch (err) {
      console.error('댓글 등록 실패:', err);
      setComments((prev) => prev.filter((c) => c._id !== tempId));
    }
  };

  // 컴포넌트가 마운트될 때 댓글 목록을 가져옴
  useEffect(() => {
    (async () => {
      try {
        const res = await commentsService.getComments(trackId);

        if (res && Array.isArray(res)) {
          setComments(res);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error('댓글 목록 조회 실패:', error);
      }
    })();
  }, [trackId]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">트랙 댓글</h2>
      <Link href={`/tracks/${trackId}/interview`} className="text-blue-500 hover:underline">
        인터뷰 페이지로 이동
      </Link>
      <SubmitInput
        placeholder="댓글을 입력하세요"
        onChange={(e) => setSubmitComment(e.target.value)}
        onSubmit={handleSubmit}
        value={submitComment}
      />

      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
}
