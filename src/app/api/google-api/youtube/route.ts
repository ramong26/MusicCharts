export const runtime = 'nodejs';
import { YouTubeItem } from '@/shared/types/Youtube';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: '검색어가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API 키가 없습니다' }, { status: 500 });
    }

    const params = new URLSearchParams({
      key: apiKey,
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: '5',
      order: 'relevance',
      videoDuration: 'medium',
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API fetch 실패:', response.status, errorText);
      return NextResponse.json(
        { error: 'YouTube fetch 실패' },
        { status: 500 }
      );
    }

    const data = await response.json();

    const videos = data.items.map((video: YouTubeItem) => ({
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
    }));

    return NextResponse.json({ items: videos });
  } catch (error) {
    console.error('YouTube API fetch error:', error);
    return NextResponse.json({ error: 'YouTube fetch 실패' }, { status: 500 });
  }
}
