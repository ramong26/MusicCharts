export async function getSpotifyUserAccessToken(): Promise<string | null> {
  try {
    const res = await fetch('/api/spotify/user-access-token');
    if (!res.ok) return null;
    const { accessToken } = await res.json();
    return accessToken;
  } catch (e) {
    console.error('유저 토큰 불러오기 실패:', e);
    return null;
  }
}
