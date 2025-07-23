let cachedToken: string | null = null;

export async function getSpotifyAccessToken() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:3000';

  const tokenRes = await fetch(`${baseUrl}/api/spotify-token`);
  const data = await tokenRes.json();

  cachedToken = data.access_token;

  return cachedToken;
}
