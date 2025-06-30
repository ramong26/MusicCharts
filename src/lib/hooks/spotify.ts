export interface SpotifyProfile {
  name: string;
  imageUrl?: string;
}

export async function fetchSpotifyProfile(
  token: string
): Promise<SpotifyProfile> {
  const res = await fetch("/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Spotify 사용자 정보를 불러오는 데 실패했습니다.");
  }

  return res.json();
}
