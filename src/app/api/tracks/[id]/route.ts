import { NextRequest, NextResponse } from 'next/server';
import { getSpotifyAccessToken } from '@/lib/spotify/spotifyTokenManager';
import { cacheGet, cacheSet } from '@/lib/redis/redis';

const ONE_DAY = 86400;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: PageProps) {
  const { id } = await params;
  const cachedKey = `track:${id}:withAlbum`;

  // 1. Redis 캐시 확인
  // const cached = await redis.get(cachedKey);

  const cached = await cacheGet(cachedKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached), { headers: { 'x-cache': 'HIT' } });
  }

  // 2. Spotify 토큰 발급
  const token = await getSpotifyAccessToken();

  // 3. 트랙 정보 fetch
  const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!trackRes.ok) {
    const errText = await trackRes.text();
    console.error(`Spotify Track Fetch failed: ${trackRes.status} ${trackRes.statusText}`, errText);
    return NextResponse.json(
      { error: `Spotify Track Fetch failed: ${trackRes.status} ${trackRes.statusText}` },
      { status: trackRes.status }
    );
  }
  let track;
  try {
    track = await trackRes.json();
  } catch {
    const errText = await trackRes.text();
    console.error('Spotify Track JSON parse error. Body was:', errText);
    return NextResponse.json(
      { error: 'Failed to parse Spotify track JSON response.' },
      { status: 502 }
    );
  }

  // 4. 앨범 정보 fetch (track.album.id 사용)
  let album = null;
  if (track?.album?.id) {
    const albumRes = await fetch(`https://api.spotify.com/v1/albums/${track.album.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (albumRes.ok) {
      try {
        album = await albumRes.json();
      } catch {
        const errText = await albumRes.text();
        console.error('Spotify Album JSON parse error. Body was:', errText);
      }
    } else {
      const errText = await albumRes.text();
      console.error(
        `Spotify Album Fetch failed: ${albumRes.status} ${albumRes.statusText}`,
        errText
      );
    }
  }

  // 5. 트랙과 앨범을 함께 응답
  const response = { track, album };
  await cacheSet(cachedKey, JSON.stringify(response), ONE_DAY);
  return NextResponse.json(response, { headers: { 'x-cache': 'MISS' } });
}
