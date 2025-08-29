import { NextRequest, NextResponse } from 'next/server';
import { YouTubeSearchItem, YouTubeVideoItem } from '@/shared/types/youtube';

const YOUTUBE_API_KEY = process.env.GOOGLE_API_KEY;
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos';

export async function GET(req: NextRequest) {
  const artist = req.nextUrl.searchParams.get('artist');
  const track = req.nextUrl.searchParams.get('track');
  const album = req.nextUrl.searchParams.get('album');

  if (!artist || !track || !album) {
    return NextResponse.json({ error: 'artist, track, album 모두 필요합니다' }, { status: 400 });
  }

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ error: 'API 키가 없습니다' }, { status: 500 });
  }

  try {
    // 1. 검색
    const query = `${artist} ${track} official music video`;
    const searchUrl = new URL(YOUTUBE_SEARCH_URL);
    searchUrl.searchParams.append('part', 'snippet');
    searchUrl.searchParams.append('q', query);
    searchUrl.searchParams.append('type', 'video');
    searchUrl.searchParams.append('maxResults', '5');
    searchUrl.searchParams.append('key', YOUTUBE_API_KEY);

    const searchRes = await fetch(searchUrl.toString());
    const searchData = await searchRes.json();

    const videoIds = searchData.items
      ?.map((item: YouTubeSearchItem) => item.id.videoId)
      .filter(Boolean);
    if (!videoIds || videoIds.length === 0) {
      return NextResponse.json({ videoId: null });
    }

    // 2. 임베드 가능한 영상 찾기
    const statusUrl = new URL(YOUTUBE_VIDEO_URL);
    statusUrl.searchParams.append('part', 'status');
    statusUrl.searchParams.append('id', videoIds.join(','));
    statusUrl.searchParams.append('key', YOUTUBE_API_KEY);

    const statusRes = await fetch(statusUrl.toString());
    const statusData = await statusRes.json();

    const embeddableVideo = statusData.items?.find(
      (item: YouTubeVideoItem) => item.status?.embeddable
    );
    if (embeddableVideo) {
      return NextResponse.json({ videoId: embeddableVideo.id });
    }

    // 3. fallback: 앨범명으로 검색
    const fallbackQuery = `${artist} ${album} official music video`;
    const fallbackSearchUrl = new URL(YOUTUBE_SEARCH_URL);
    fallbackSearchUrl.searchParams.append('part', 'snippet');
    fallbackSearchUrl.searchParams.append('q', fallbackQuery);
    fallbackSearchUrl.searchParams.append('type', 'video');
    fallbackSearchUrl.searchParams.append('maxResults', '5');
    fallbackSearchUrl.searchParams.append('key', YOUTUBE_API_KEY);

    const fallbackSearchRes = await fetch(fallbackSearchUrl.toString());
    const fallbackSearchData = await fallbackSearchRes.json();

    const fallbackIds = fallbackSearchData.items
      ?.map((item: YouTubeSearchItem) => item.id.videoId)
      .filter(Boolean);

    if (!fallbackIds || fallbackIds.length === 0) {
      return NextResponse.json({ videoId: null });
    }

    const fallbackStatusUrl = new URL(YOUTUBE_VIDEO_URL);
    fallbackStatusUrl.searchParams.append('part', 'status');
    fallbackStatusUrl.searchParams.append('id', fallbackIds.join(','));
    fallbackStatusUrl.searchParams.append('key', YOUTUBE_API_KEY);

    const fallbackStatusRes = await fetch(fallbackStatusUrl.toString());
    const fallbackStatusData = await fallbackStatusRes.json();
    const fallbackVideo = fallbackStatusData.items?.find(
      (item: YouTubeVideoItem) => item.status?.embeddable
    );
    return NextResponse.json({ videoId: fallbackVideo?.id || null });
  } catch (e) {
    console.error('youtube-embed 에러:', e);
    return NextResponse.json({ videoId: null }, { status: 500 });
  }
}
