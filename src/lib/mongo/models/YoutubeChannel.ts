import { Schema, model, models } from 'mongoose';

const youtubeChannelSchema = new Schema(
  {
    handle: { type: String, required: true, unique: true },
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

export const YoutubeChannel =
  models.YoutubeChannel || model('YoutubeChannel', youtubeChannelSchema);
