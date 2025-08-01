import { Track, Album } from '@/shared/types/SpotifyTrack';
import { getBaseUrl } from '@/lib/utils/baseUrl';

export default async function getTrackIdAlbum(track: Track | null): Promise<Album | null> {
  if (!track?.album?.id) return null;

  const baseUrl = getBaseUrl();
  // 토큰 가져오기
  const tokenRes = await fetch(`${baseUrl}/api/spotify/spotify-token`, {
    cache: 'no-store',
  });
  const { access_token } = await tokenRes.json();

  // 스포티파이 API 호출
  const topTrackRes = await fetch(`https://api.spotify.com/v1/albums/${track.album.id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });

  // 에러 처리
  if (!topTrackRes.ok) {
    throw new Error('Failed to fetch data');
  }

  // 데이터를 json 형식으로 변환
  const data = await topTrackRes.json();
  return data;
}
