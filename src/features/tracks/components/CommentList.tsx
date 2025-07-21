'use client';
import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  userId: string;
  trackId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export default function CommentList({ trackId }: { trackId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?trackId=${trackId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [trackId]);
  console.log('Comments fetched:', comments);
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">댓글 목록</h3>
      <ul className="list-disc pl-5">
        {comments.map((comment) => (
          <li key={comment._id} className="mb-2">
            <p className="text-sm">{comment.text}</p>
            <span className="text-xs text-gray-500">
              작성자: {comment.userId}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
