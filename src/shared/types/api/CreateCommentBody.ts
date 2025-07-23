import { Comment } from '@/shared/types/Comment';
export interface CreateCommentBody {
  trackId: number | string;
  text: string;
}
export interface UpdateCommentBody {
  text: string;
}
