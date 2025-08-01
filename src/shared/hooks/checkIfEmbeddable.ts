const YOUTUBE_API_KEY = process.env.GOOGLE_API_KEY;
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos';

// 유튜브 비디오가 임베드 가능한지 확인하는 함수
export async function checkIfEmbeddable(videoId: string): Promise<boolean> {
  try {
    const url = new URL(YOUTUBE_VIDEO_URL);
    url.searchParams.append('part', 'status');
    url.searchParams.append('id', videoId);
    url.searchParams.append('key', YOUTUBE_API_KEY || '');
    url.searchParams.append('part', 'status,player');
    console.log(url.toString());
    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error('YouTube API 요청 실패:', response.statusText);
      return false;
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      console.log(data.items[0]);
      return data.items[0].status.embeddable;
    }
    return false;
  } catch (error) {
    console.error('유튜브 비디오 임베드 가능 여부 확인 중 오류 발생:', error);
    return false;
  }
}

// 유튜브 임베드 오류시 대체 가능 함수
export async function getYoutubeEmbedFallback(
  artist: string,
  album: string
): Promise<string | null> {
  try {
    const url = new URL(YOUTUBE_SEARCH_URL);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('q', `${artist} ${album} official music video`);
    url.searchParams.append('type', 'video');
    url.searchParams.append('key', YOUTUBE_API_KEY || '');
    url.searchParams.append('maxResults', '5');

    const response = await fetch(url.toString());
    const data = await response.json();

    const videoIds = data.items?.map((item: any) => item.id.videoId).filter(Boolean);
    if (!videoIds || videoIds.length === 0) return null;

    const statusUrl = new URL(YOUTUBE_VIDEO_URL);
    statusUrl.searchParams.append('part', 'status');
    statusUrl.searchParams.append('id', videoIds.join(','));
    statusUrl.searchParams.append('key', YOUTUBE_API_KEY || '');

    const statusResponse = await fetch(statusUrl.toString());
    const statusData = await statusResponse.json();
    const embeddableVideos = statusData.items.filter((item: any) => item.status.embeddable);

    if (embeddableVideos.length > 0) {
      return embeddableVideos[0].id;
    }

    return null;
  } catch (error) {
    console.error('유튜브 임베드 대체 영상 검색 중 오류:', error);
    return null;
  }
}
