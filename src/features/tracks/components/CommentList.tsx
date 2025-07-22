'use client';
import Image from 'next/image';
import { Comment } from '@/shared/types/Comment';
import useUserStore from '@/stores/userStore';

export default function CommentList({
  comments,
  setComments,
}: {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const { user } = useUserStore();

  console.log(user);

  // 댓글 삭제 핸들러
  const handleDelete = async (commentId: string) => {
    if (!user) {
      console.error('로그인 상태가 아닙니다');
      return;
    }
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('댓글 삭제 실패');

      // 댓글 삭제 후 상태 업데이트
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  // 댓글 수정 핸들러
  const handleEdit = async (commentId: string) => {
    if (!user) {
      console.error('로그인 상태가 아닙니다');
      return;
    }
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        // 여기다 수정된 text를 넣어야 합니다.
        body: JSON.stringify({ text: '수정된 댓글 내용' }),
      });
      if (!response.ok) throw new Error('댓글 수정 실패');

      setComments((prev) =>
        prev.map((c) => {
          if (c._id === commentId) {
            return {
              ...c,
              text: '수정된 댓글 내용',
              updatedAt: new Date().toISOString(),
            };
          }
          return c;
        })
      );
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
    }
  };
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">댓글 목록</h3>
      <ul className="border-2 p-3 mb-2 ">
        {comments.map((comment) => (
          <li key={comment._id} className="border-b border-gray-200 py-2">
            <div className="flex items-center gap-2">
              <Image
                width={32}
                height={32}
                src={
                  comment.userId.profileImageUrl ||
                  user?.profileImageUrl ||
                  '/default-profile.png'
                }
                alt="사용자 프로필 이미지"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">
                {comment.userId.displayName}
              </span>
            </div>
            <p className="mt-1">{comment.text}</p>
            <div className="text-gray-500 mt-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
              <div>
                <button
                  className="text-sm text-gray-500 ml-2 cursor-pointer"
                  onClick={() => handleEdit(comment._id)}
                >
                  수정
                </button>
                <button
                  className="text-sm text-red-500 ml-2 cursor-pointer"
                  onClick={() => handleDelete(comment._id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
