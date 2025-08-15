'use client';
import Link from 'next/link';

import SubmitInput from '@/shared/components/SubmitInput';
import CommentList from '@/features/tracks/components/CommentList';
import useTrackComments from '@/features/tracks/hooks/TrackComments/useTrackComments';

export default function TrackComments({ trackId }: { trackId: string }) {
  const { comments, setComments, submitComment, setSubmitComment, handleSubmit } =
    useTrackComments(trackId);

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
