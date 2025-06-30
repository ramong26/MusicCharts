export interface SpotifyProfile {
  name: string;
  imageUrl?: string;
}

export async function fetchSpotifyProfile(
  token: string
): Promise<SpotifyProfile> {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Spotify 프로필 불러오기 실패");
  }

  const data = await res.json();
  // console.log("Spotify 프로필 데이터:", data);
  return {
    name: data.display_name || "사용자",
    imageUrl: data.images?.[1]?.url || undefined,
  };
}
