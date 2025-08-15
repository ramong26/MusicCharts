'use client';
import Image from 'next/image';

import useFetchWikiInfo from '../../hooks/TrackDescription/useFetchWikiInfo';
import { Album } from '@/shared/types/spotifyTrack';

export default function TrackDescription({ album }: { album: Album }) {
  // 앨범 정보를 위키피디아를 통해 가져옴
  const { summary } = useFetchWikiInfo({ album });

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다.');
      })
      .catch((error) => {
        console.error('링크 복사 실패:', error);
        alert('링크 복사에 실패했습니다.');
      });
  };

  if (!album) {
    return <div>앨범 정보를 불러오는 중...</div>;
  }
  return (
    <div>
      <div className="flex gap-10">
        <Image src={album.images[0].url} alt={album.name} width={400} height={400} />
        <div>
          <div className="flex gap-2 items-center">
            <div className="font-bold text-xl">{album.name}</div>

            <div className="cursor-pointer" onClick={handleCopyLink}>
              공유
            </div>
          </div>
          <div>{summary}</div>
        </div>
      </div>
    </div>
  );
}
