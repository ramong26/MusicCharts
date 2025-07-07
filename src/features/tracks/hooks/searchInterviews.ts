import { CustomSearchResult } from '../types/custom-search';

const BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    : '';

export async function searchInterviews(
  who: string
): Promise<CustomSearchResult[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/google-api/interviews?query=${encodeURIComponent(who)}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        'API Route 호출 실패:',
        res.status,
        res.statusText,
        errorText
      );
      throw new Error('Failed to fetch interview search results');
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('getTrackIdInterview() 에러:', error);
    return [];
  }
}
// 사용법:  const interviews = await getTrackIdInterview(who);
