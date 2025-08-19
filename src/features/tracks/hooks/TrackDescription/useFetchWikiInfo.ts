import { useState, useEffect } from 'react';

import { Album } from '@/shared/types/spotifyTrack';

export default function useFetchWikiInfo({ album }: { album: Album }) {
  const [summary, setSummary] = useState('');

  // 위키 정보 가져오기
  useEffect(() => {
    const fetchWikiInfo = async () => {
      const searchQuery = [album.name, album.artists[0].name, album.type].filter(Boolean).join(' ');
      const topTitleResponse = await fetch(
        '/api/wiki/wiki-top-title?query=' + encodeURIComponent(searchQuery)
      );
      const topTitleData = await topTitleResponse.json();
      const topTitle = topTitleData.title;

      if (topTitle) {
        const summaryText = await fetch(
          '/api/wiki/wiki-summary?title=' + encodeURIComponent(topTitle)
        );
        if (!summaryText.ok) {
          setSummary('해당 앨범에 대한 위키 문서를 찾을 수 없습니다.');
          return;
        }
        const summaryData = await summaryText.json();

        setSummary(summaryData.extract_ko || summaryData.extract || 'No summary available');
      } else {
        setSummary('해당 앨범에 대한 위키 문서를 찾을 수 없습니다.');
      }
    };

    fetchWikiInfo();
  }, [album.id, , album.name, album.artists, album.type]);

  return { summary };
}
