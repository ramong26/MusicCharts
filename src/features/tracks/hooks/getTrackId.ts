import { Track } from "@/shared/types/SpotifyTrack";

export default async function getTrackId(trackId?: string): Promise<Track> {
  const baseUrl = "http://127.0.0.1:3000";

  const tokenRes = await fetch(`${baseUrl}/api/spotify-token`, {
    cache: "no-store",
  });
  const { access_token } = await tokenRes.json();

  const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  if (!trackRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await trackRes.json();
  return data;
}
