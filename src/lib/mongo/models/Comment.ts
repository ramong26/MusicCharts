import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
  userId: { type: String, required: true },
  trackId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Comment = models.Comment || model('Comment', commentSchema); // model Comment라는 이름으로 저장, models 몽구스 모델을 전역적으로 캐시
