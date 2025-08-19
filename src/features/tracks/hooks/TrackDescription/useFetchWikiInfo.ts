import { useState, useEffect } from 'react';

import { Album } from '@/shared/types/spotifyTrack';
import { getTopWikiTitle, fetchWikiSummary } from '@/features/tracks/hooks/fetchWikiSummary';
import useTranslate from '@/shared/hooks/useTranslate';

export default function useFetchWikiInfo({ album }: { album: Album }) {
  const [summary, setSummary] = useState('');

  const { translateText } = useTranslate();

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
        const translatedSummary = await translateText(summaryData.extract, 'ko');

        setSummary(translatedSummary);
      } else {
        setSummary('해당 앨범에 대한 위키 문서를 찾을 수 없습니다.');
      }
    };

    fetchWikiInfo();
  }, [album.id, translateText, album.name, album.artists, album.type]);

  return { summary };
}

// import { useState, useEffect } from 'react';

// import { Album } from '@/shared/types/spotifyTrack';
// import { getTopWikiTitle, fetchWikiSummary } from '@/features/tracks/hooks/fetchWikiSummary';
// import useTranslate from '@/shared/hooks/useTranslate';

// export default function useFetchWikiInfo({ album }: { album: Album }) {
//   const [summary, setSummary] = useState('');

//   const { translateText } = useTranslate();

//   // 위키 정보 가져오기
//   useEffect(() => {
//     const fetchWikiInfo = async () => {
//       const searchQuery = [album.name, album.artists[0].name, album.type].filter(Boolean).join(' ');
//       const topTitle = await getTopWikiTitle(searchQuery);

//       if (topTitle) {
//         const summaryText = await fetchWikiSummary(topTitle);
//         const translatedSummary = await translateText(summaryText, 'ko');

//         setSummary(translatedSummary);
//       } else {
//         setSummary('해당 앨범에 대한 위키 문서를 찾을 수 없습니다.');
//       }
//     };

//     fetchWikiInfo();
//   }, [album.id, translateText, album.name, album.artists, album.type]);

//   return { summary };
// }
