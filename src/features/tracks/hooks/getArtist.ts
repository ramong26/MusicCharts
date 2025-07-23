import { Artist } from '@/shared/types/SpotifyTrack';

export default async function getArtist(artistId?: string): Promise<Artist> {
  const baseUrl = 'http://127.0.0.1:3000';

  const tokenRes = await fetch(`${baseUrl}/api/spotify-token`, {
    cache: 'no-store',
  });
  const { access_token } = await tokenRes.json();

  const artistRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
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
