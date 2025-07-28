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
    const params = new URLSearchParams({ seed_genres: genre, limit });
    const res = await fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to fetch recommendations: ${errorData.error.message}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
