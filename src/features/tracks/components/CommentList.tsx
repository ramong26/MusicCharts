'use client';
import { Comment } from '@/shared/types/Comment';
import CommentItem from './CommentItem';
import { commentsService } from '@/service/commentService';
export default function CommentList({
  comments,
  setComments,
}: {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  // 댓글 삭제 핸들러
  const handleDelete = async (commentId: string) => {
    try {
      await commentsService.deleteComments(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  // 댓글 수정 핸들러
  const handleEdit = async (commentId: string, newText: string) => {
    try {
      const updatedComment = await commentsService.putComments(commentId, {
        text: newText,
      });
      if (!updatedComment) throw new Error('수정 실패');
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, text: newText, updatedAt: new Date().toISOString() }
            : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">댓글 목록</h3>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        <ul className="border-2 p-3 mb-2 space-y-4">
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              comment={comment}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
