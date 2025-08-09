import { CustomSearchResult } from '@/features/tracks/types/custom-search';
import { formatDate } from '@/lib/utils/date';
import { YouTubeItem } from '@/shared/types/Youtube';
import { getBaseUrl } from '@/lib/utils/baseUrl';
import callApi from '@/shared/hooks/callApi';
const baseUrl = getBaseUrl();

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

  return callApi<CustomSearchResult[]>(
    `${baseUrl}/api/google-api/interviews?query=${encodeURIComponent(query)}`,
    undefined,
    (data) =>
      Array.isArray(data)
        ? data.filter((item) => {
            const title = item.title?.toLowerCase() || '';
            return !title.includes('shorts') && !title.includes('reaction');
          })
        : []
  );
}
// 사용법:  const interviews = await getTrackIdInterview(who);

// Google GeminiAi 사용하여 인터뷰 검색
export async function searchInterviewsWithGeminiAI(who: string): Promise<CustomSearchResult[]> {
  return callApi<CustomSearchResult[]>(
    `${baseUrl}/api/gemini-api/getInterviews`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: who }),
    },
    (data) =>
      Array.isArray(data)
        ? data.filter((item: YouTubeItem) => ({
            title: item?.snippet?.title,
            link: `https://www.youtube.com/watch?v=${item?.id?.videoId}`,
            thumbnail: item?.snippet?.thumbnails?.high?.url,
            publishedAt: item?.snippet?.publishedAt,
            description: item?.snippet?.description,
            displayLink: 'www.youtube.com',
          }))
        : []
  );
}

// 유튜브 인터뷰 검색
export async function searchInterviewsWithYouTube(who: string): Promise<CustomSearchResult[]> {
  return callApi<CustomSearchResult[]>(
    `${baseUrl}/api/google-api/youtube?q=${encodeURIComponent(who)}  ${who} interview`,
    undefined,
    (data) =>
      Array.isArray(data)
        ? data.map((item: YouTubeItem) => ({
            title: item?.snippet?.title,
            link: `https://www.youtube.com/watch?v=${item?.id?.videoId}`,
            thumbnail: item?.snippet?.thumbnails?.high?.url,
            publishedAt: item?.snippet?.publishedAt,
            description: item?.snippet?.description,
            displayLink: 'www.youtube.com',
          }))
        : []
  );
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
  const [googleResults, genAIResults] = await Promise.all([
    searchInterviews(who),
    searchInterviewsWithGeminiAI(who),
  ]);

  const combinedMap = new Map<string, CustomSearchResult>();
  [...googleResults, ...genAIResults].forEach((item) => {
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
