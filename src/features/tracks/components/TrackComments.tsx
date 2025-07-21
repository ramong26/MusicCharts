'use client';
import { useState } from 'react';
import SubmitInput from '@/shared/components/SubmitInput';

export default function TrackComments({ trackId }: { trackId: string }) {
  const [submitComment, setSubmitComment] = useState('');

  const handleSubmit = async (value: string) => {
    if (!value.trim()) {
      console.error('댓글 내용이 비어있습니다');
      return;
    }
    try {
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

      setSubmitComment('');
    } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">트랙 댓글</h2>
      <SubmitInput
        placeholder="댓글을 입력하세요"
        onChange={(e) => setSubmitComment(e.target.value)}
        onSubmit={handleSubmit}
        value={submitComment}
      />
      <p>여기에 트랙에 대한 댓글이 표시됩니다.</p>
      {/* 여기에 트랙 댓글 관련 컴포넌트를 추가할 수 있습니다 */}
    </div>
  );
}
