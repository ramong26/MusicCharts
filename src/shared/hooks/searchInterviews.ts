import { CustomSearchResult } from '@/features/tracks/types/custom-search';
import { formatDate } from '@/lib/utils/date';
import { YouTubeItem } from '@/shared/types/youtube';
const BASE_URL =
  typeof window === 'undefined' ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' : '';

const INTERVIEW_SITES = [
  'site:rollingstone.com',
  'site:billboard.com',
  'site:complex.com',
  'site:pitchfork.com',
  'site:koreanmusicjournal.com',
];

function getDateYearsAgo(years: number): string {
  const today = new Date();
  today.setFullYear(today.getFullYear() - years);
  return formatDate(today);
}

// 검색어로 인터뷰를 검색하는 함수
export async function searchInterviews(who: string): Promise<CustomSearchResult[]> {
  const afterDate = getDateYearsAgo(4);
  const query = `${who} ("official interview" OR "interview with") (${INTERVIEW_SITES.join(
    ' OR '
  )}) after:${afterDate}`;

  try {
    const res = await fetch(
      `${BASE_URL}/api/google-api/interviews?query=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Route 호출 실패:', res.status, res.statusText, errorText);
      throw new Error('Failed to fetch interview search results');
    }

    const data: CustomSearchResult[] = await res.json();

    const filtered = data.filter((item) => {
      const title = item.title?.toLowerCase() || '';
      return !title.includes('shorts') && !title.includes('reaction');
    });

    return filtered;
  } catch (error) {
    console.error('getTrackIdInterview() 에러:', error);
    return [];
  }
}

// 사용법:  const interviews = await getTrackIdInterview(who);

// Google GeminiAi 사용하여 인터뷰 검색
export async function searchInterviewsWithGeminiAI(who: string): Promise<CustomSearchResult[]> {
  try {
    const res = await fetch('/api/gemini-api/getInterviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: who }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Google GenAI API 호출 실패:', res.status, res.statusText, errorText);
      return [];
    }

    const data = await res.json();
    return data.items.map((item: YouTubeItem) => ({
      title: item?.snippet?.title,
      link: `https://www.youtube.com/watch?v=${item?.id?.videoId}`,
      thumbnail: item?.snippet?.thumbnails?.high?.url,
      publishedAt: item?.snippet?.publishedAt,
      snippet: item?.snippet?.description,
      displayLink: 'www.youtube.com',
    }));
  } catch (error) {
    console.error('searchInterviewsWithGoogleGenAI() 에러:', error);
    return [];
  }
}

// 유튜브 인터뷰 검색
export async function searchInterviewsWithYouTube(who: string): Promise<CustomSearchResult[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/google-api/youtube?q=${encodeURIComponent(who)}  ${who} interview`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('YouTube API 호출 실패:', res.status, res.statusText, errorText);
      return [];
    }

    const data = await res.json();
    return data.items.map((item: YouTubeItem) => ({
      title: item?.snippet?.title,
      link: `https://www.youtube.com/watch?v=${item?.id?.videoId}`,
      thumbnail: item?.snippet?.thumbnails?.high?.url,
      publishedAt: item?.snippet?.publishedAt,
      snippet: item?.snippet?.description,
      displayLink: 'www.youtube.com',
    }));
  } catch (error) {
    console.error('searchInterviewsWithYouTube() 에러:', error);
    return [];
  }
}

// 아티스트별 인터뷰 검색 결과를 통합하여 반환하는 함수
export async function getCombinedInterviews(
  who: string,
  offset = 0,
  limit = 5
): Promise<{
  results: CustomSearchResult[];
  totalCount: number;
}> {
  const [googleResults, genAIResults, youtubeResults] = await Promise.all([
    searchInterviews(who),
    searchInterviewsWithGeminiAI(who),
    searchInterviewsWithYouTube(who),
  ]);

  const combinedMap = new Map<string, CustomSearchResult>();
  [...googleResults, ...genAIResults, ...youtubeResults].forEach((item) => {
    if (!combinedMap.has(item.link)) {
      combinedMap.set(item.link, item);
    }
  });

  const combinedResults = Array.from(combinedMap.values());
  const totalCount = combinedResults.length;

  const paginatedResults = combinedResults.slice(offset, offset + limit);

  return {
    results: paginatedResults,
    totalCount,
  };
}
