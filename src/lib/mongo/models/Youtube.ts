import { Schema, model, models } from 'mongoose';

const videoSchema = new Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
});

const youtubeSchema = new Schema(
  {
    trackName: { type: String, required: true, unique: true },
    videos: { type: [videoSchema], default: [] },
  },
  { timestamps: true }
);

export const Youtube = models.Youtube || model('Youtube', youtubeSchema);
