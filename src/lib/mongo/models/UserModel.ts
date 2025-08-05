import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    spotifyId: { type: String, unique: true, sparse: true },
    googleId: { type: String, unique: true, sparse: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    profileImageUrl: { type: String },
    lastLogin: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const UserModel = models.User || model('User', userSchema);
