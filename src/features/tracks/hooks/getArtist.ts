import { Artist } from '@/shared/types/SpotifyTrack';
import { getSpotifyAccessToken } from '@/lib/spotify/spotifyTokenManager';

export default async function getArtist(artistId?: string): Promise<Artist> {
  const token = await getSpotifyAccessToken();

  const artistRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  if (!artistRes.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await artistRes.json();
  return data;
}
