import Image from 'next/image';
import { Comment } from '@/shared/types/Comment';

export default function CommentList({ comments }: { comments: Comment[] }) {
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
                src={comment.userId.profileImageUrl || '/default-avatar.png'}
                alt={comment.userId.displayName}
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
                <button className="text-sm text-gray-500 ml-2 cursor-pointer">
                  수정
                </button>
                <button className="text-sm text-red-500 ml-2 cursor-pointer">
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
