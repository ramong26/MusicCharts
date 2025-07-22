'use client';
import Image from 'next/image';
import { useState } from 'react';

import { Comment } from '@/shared/types/Comment';
import useUserStore from '@/stores/userStore';

export default function CommentList({
  comments,
  setComments,
}: {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
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
        body: JSON.stringify({ text: editText }),
      });
      if (!response.ok) throw new Error('댓글 수정 실패');

      setComments((prev) =>
        prev.map((c) => {
          if (c._id === commentId) {
            return {
              ...c,
              text: editText,
              updatedAt: new Date().toISOString(),
            };
          }
          return c;
        })
      );
      setIsEditing(null);
      setEditText('');
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
    }
  };
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">댓글 목록</h3>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
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
                {user && user._id === comment.userId._id ? (
                  <div className="flex items-center gap-2">
                    {isEditing === comment._id ? (
                      <>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="border p-1 rounded"
                        />
                        <button
                          onClick={() => handleEdit(comment._id)}
                          className="text-blue-500"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => setIsEditing(null)}
                          className="text-gray-500"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setIsEditing(comment._id);
                          setEditText(comment.text);
                        }}
                        className="text-blue-500"
                      >
                        수정
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-red-500"
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
