'use client';
import { useState } from 'react';
import Image from 'next/image';

import type { Comment } from '@/shared/types/comment';

import { formatDate } from '@/lib/utils/date';
import CommentEditInput from './CommentEditInput';
import useUserStore from '@/stores/userStore';

interface Props {
  comment: Comment;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function CommentItem({ comment, onDelete, onEdit }: Props) {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newText: string) => {
    onEdit(comment._id, newText);
    setIsEditing(false);
  };

  const commentUserId = typeof comment.userId === 'string' ? comment.userId : comment.userId?._id;

  const isMyComment = user?._id === commentUserId;
  return (
    <li className="border-b border-gray-200 py-2">
      <div className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          src={
            typeof comment.userId === 'object' && comment.userId?.profileImageUrl
              ? comment.userId.profileImageUrl
              : user?.profileImageUrl || '/default-profile.png'
          }
          alt="사용자 프로필 이미지"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold">
          {typeof comment.userId === 'string' ? undefined : comment?.userId?.displayName}
        </span>
      </div>

      {!isEditing ? (
        <p className="mt-1">{comment.text}</p>
      ) : (
        <CommentEditInput
          initialValue={comment.text}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <div className="text-sm text-gray-500 mt-1 flex items-center justify-between">
        <span>{formatDate(comment.createdAt)}</span>
        {isMyComment && !isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(comment._id)}
              className="text-red-500 hover:underline cursor-pointer"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
