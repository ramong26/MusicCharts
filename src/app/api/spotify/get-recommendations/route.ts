import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyAccessToken } from '@/lib/spotify/spotifyTokenManager';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get('genre');
  const limit = searchParams.get('limit') || '10';
  const token = await getSpotifyAccessToken();

  if (!genre) {
    return NextResponse.json({ error: 'Missing genre parameter' }, { status: 400 });
  }

  try {
    const query = `?seed_genres=${genre}&limit=${limit}`;

    const res = await fetch(`https://api.spotify.com/v1/recommendations${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
