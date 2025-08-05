export const getBaseUrl = (): string => {
  return process.env.NODE_ENV === 'production'
    ? (process.env.BASE_URL ?? 'https://music-charts.vercel.app')
    : 'http://127.0.0.1:3000';
};

export const getRedirectUri = (): string => {
  return process.env.NODE_ENV === 'production'
    ? (process.env.SPOTIFY_REDIRECT_URI_PROD ??
        'https://music-charts.vercel.app/api/auth/spotify/callback')
    : (process.env.SPOTIFY_REDIRECT_URI_DEV ?? 'http://127.0.0.1:3000/api/auth/spotify/callback');
};
