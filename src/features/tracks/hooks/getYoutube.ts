import { getBaseUrl } from '@/lib/utils/baseUrl';
import { YouTubeItem } from '@/shared/types/Youtube';

export async function getYoutubeTrackFetchVideo(trackName: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/youtube-search?q=${encodeURIComponent(trackName)}`);
  console.log(res.url);
  if (!res.ok) {
    console.error('YouTube API 요청 실패:', res.statusText);
    throw new Error('유튜브 검색에 실패했습니다');
  }

  const data = await res.json();
  const videos = data.items.map((item: YouTubeItem) => ({
    videoId: item?.id.videoId,
    title: item?.snippet.title,
    thumbnailUrl: item?.snippet.thumbnails.high.url,
  }));

  if (videos.length === 0) {
    throw new Error('비디오를 찾을 수 없습니다');
  }

  return videos;
}
