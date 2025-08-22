import type { TrackItem } from '@/shared/types/spotifyTrack';
import { useFetchArtistInterviews } from '@/features/playlist/hooks/PlaylistInterviewList/useFetchArtistInterviews';

import PlaylistArtistInterviewList from '@/features/playlist/components/PlaylistInterviewList/PlaylistArtistInterviewList';

interface PlaylistInterviewListProps {
  trackData?: TrackItem[];
}

export default function PlaylistInterviewList({ trackData }: PlaylistInterviewListProps) {
  const { artistInterviews, observerRef, isScrollLoading, artists, chunkSize, visibleChunks } =
    useFetchArtistInterviews({ trackData });

  if (!trackData || trackData.length === 0) {
    return <p>트랙 데이터를 불러오는 중이거나 없습니다.</p>;
  }

  return (
    <div className="pb-10">
      <div className="relative  border-3 border-t-black border-l-black border-r-black pt-5 pl-5 pr-5 mt-10 bg-white w-full ">
        <h3 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 border-2 border-black font-bold text-2xl whitespace-nowrap">
          아티스트 인터뷰 검색 결과
        </h3>
        <div className="space-y-6 mt-10 ">
          {artists.slice(0, visibleChunks * chunkSize).map((artist) => (
            <PlaylistArtistInterviewList
              key={artist}
              artist={artist}
              interviews={artistInterviews[artist]}
            />
          ))}
          {isScrollLoading && <div className="text-center text-gray-500">로딩 중...</div>}
          {visibleChunks * chunkSize < artists.length && <div ref={observerRef} className="h-10" />}
        </div>
      </div>
    </div>
  );
}
