import { TrackItem } from "../types/playlist";

export default async function getTopTrackPlaylist(
  playlistId: string
): Promise<TrackItem[]> {
  const baseUrl = "http://127.0.0.1:3000";

  const tokenRes = await fetch(`${baseUrl}/api/spotify-token`, {
    cache: "no-store",
  });
  const { access_token } = await tokenRes.json();

  const playlistRes = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  if (!playlistRes.ok) {
    throw new Error("Failed to fetch playlist");
  }

  const data = await playlistRes.json();
  return data.tracks.items;
}
