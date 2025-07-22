import { create } from 'zustand';
import { Comment } from '@/shared/types/Comment';

interface CommentStore {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (updatedComment: Comment) => void;
  deleteComment: (commentId: string) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
    })),
  updateComment: (updatedComment) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      ),
    })),
  deleteComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment._id !== commentId),
    })),
}));
