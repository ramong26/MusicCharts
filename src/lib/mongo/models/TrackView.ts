import { Schema, model, models } from 'mongoose';

const tracksViewSchema = new Schema(
  {
    trackId: { type: String, required: true },
    genre: { type: [String], required: true },
    userId: { type: String, required: false },
    guestId: { type: String, required: false },
  },
  { timestamps: true }
);

export const TracksView = models.TracksView || model('TracksView', tracksViewSchema);
