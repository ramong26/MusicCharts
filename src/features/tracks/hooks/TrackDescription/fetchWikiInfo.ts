import { Album } from '@/shared/types/spotifyTrack';
import { getBaseUrl } from '@/lib/utils/baseUrl';

export default async function fetchWikiInfo({ album }: { album: Album }) {
  const baseUrl = getBaseUrl();
  try {
    const searchQuery = [album.name, album.artists[0].name, album.type].filter(Boolean).join(' ');
    const topTitleRes = await fetch(
      `${baseUrl}/api/wiki/wiki-top-title?query=${encodeURIComponent(searchQuery)}`,
      { cache: 'no-store' }
    );

    const topTitleData = await topTitleRes.json();
    const topTitle = topTitleData.title;

    if (topTitle) {
      const summaryText = await fetch(
        `${baseUrl}/api/wiki/wiki-summary?title=${encodeURIComponent(topTitle)}`,
        { cache: 'no-store' }
      );
      if (!summaryText.ok) {
        throw new Error('해당 앨범에 대한 위키 문서를 찾을 수 없습니다.');
      }
      const summaryData = await summaryText.json();

      return summaryData.extract_ko || summaryData.extract || 'No summary available';
    } else {
      throw new Error('해당 앨범에 대한 위키 문서를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Error fetching wiki info:', error);
    return 'Error fetching wiki info';
  }
}
