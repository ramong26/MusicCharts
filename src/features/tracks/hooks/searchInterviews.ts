import { CustomSearchResult } from '../types/custom-search';

export async function getTrackIdInterview(
  who: string
): Promise<CustomSearchResult[]> {
  try {
    // 내부 API Route 호출로 변경
    const res = await fetch(
      `/api/google-api/interviews?query=${encodeURIComponent(who)}`
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
