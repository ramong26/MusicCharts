import { useCallback } from 'react';
import { commentsService } from '@/service/commentService';
import type { Comment } from '@/shared/types/comment';

export default function useCommentAction({
  setComments,
}: {
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
}) {
  // 댓글 삭제 핸들러
  const handleDelete = useCallback(
    async (commentId: string) => {
      try {
        await commentsService.deleteComments(commentId);
        setComments((prev) => (prev ?? []).filter((c) => c._id !== commentId));
      } catch (err) {
        console.error(err);
      }
    },
    [setComments]
  );

  // 댓글 수정 핸들러
  const handleEdit = useCallback(
    async (commentId: string, newText: string) => {
      try {
        const updatedComment = await commentsService.putComments(commentId, {
          text: newText,
        });
        if (!updatedComment) throw new Error('수정 실패');
        setComments((prev) =>
          (prev ?? []).map((c) =>
            c._id === commentId ? { ...c, text: newText, updatedAt: new Date().toISOString() } : c
          )
        );
      } catch (err) {
        console.error(err);
      }
    },
    [setComments]
  );
  return {
    handleDelete,
    handleEdit,
  };
}
