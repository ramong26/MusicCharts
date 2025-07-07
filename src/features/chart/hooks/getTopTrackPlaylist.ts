import { TrackItem } from '@/shared/types/SpotifyTrack';

export default async function getPlaylistTracks({
  playlistId,
  offset = 0,
  limit = 10,
}: {
  playlistId: string;
  offset?: number;
  limit?: number;
}): Promise<TrackItem[]> {
  const baseUrl = 'http://127.0.0.1:3000';

  const tokenRes = await fetch(`${baseUrl}/api/spotify-token`, {
    cache: 'no-store',
  });
  const { access_token } = await tokenRes.json();

  const playlistRes = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    }
  );

  if (!playlistRes.ok) {
    throw new Error('Failed to fetch playlist');
  }

  const data = await playlistRes.json();

  return data.items;
}
