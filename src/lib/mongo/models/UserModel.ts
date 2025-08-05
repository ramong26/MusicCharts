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

userSchema.pre('validate', function (next) {
  if (!this.spotifyId && !this.googleId) {
    return next(new Error('At least one of spotifyId or googleId must be provided.'));
  }
  next();
});

export const UserModel = models.User || model('User', userSchema);
