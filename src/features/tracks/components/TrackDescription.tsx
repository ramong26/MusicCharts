'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getTopWikiTitle, fetchWikiSummary } from '@/features/tracks/hooks/fetchWikiSummary';
import useTranslate from '@/shared/hooks/useTranslate';

import { Album } from '@/shared/types/spotifyTrack';

export default function TrackDescription({ album }: { album: Album }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const { translateText } = useTranslate();

  useEffect(() => {
    const fetchWikiInfo = async () => {
      const searchQuery = [album.name, album.artists[0].name, album.type].filter(Boolean).join(' ');
      const topTitle = await getTopWikiTitle(searchQuery);

      if (topTitle) {
        const summaryText = await fetchWikiSummary(topTitle);
        const translatedSummary = await translateText(summaryText, 'ko');

        setLoading(false);
        setSummary(translatedSummary);
      } else {
        setSummary('해당 앨범에 대한 위키 문서를 찾을 수 없습니다.');
      }
    };

    setLoading(true);
    fetchWikiInfo();
  }, [album.id, translateText, album.name, album.artists, album.type]);

  return (
    <div>
      <div className="flex gap-10">
        <Image src={album.images[0].url} alt={album.name} width={400} height={400} />
        <div>
          <div className="flex gap-2 items-center">
            <div className="font-bold text-xl">{album.name}</div>
            <div className="flex items-center justify-between">
              <div>공유</div>
              <div>카카오톡공유</div>
            </div>
          </div>
          <div>{loading ? '앨범 정보를 불러오는 중...' : summary}</div>
        </div>
      </div>
    </div>
  );
}
