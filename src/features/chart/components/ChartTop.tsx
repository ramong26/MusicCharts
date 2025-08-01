import Image from 'next/image';

import InterviewList from '@/features/homepage/components/InterviewList';
import Miniplayer from '@/features/chart/components/Miniplayer';

import { TrackItem } from '@/shared/types/SpotifyTrack';
import IframeYoutube from '@/features/chart/components/IframeYoutube';

export default async function ChartTop({ tracksList }: { tracksList: TrackItem[] }) {
  if (!tracksList || tracksList.length === 0) {
    return <div>트랙이 없습니다.</div>;
  }

  return (
    <div className="relative border-3 border-black p-10 mt-10 max-w-7xl mx-auto bg-white">
      <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black  text-white px-6 py-2 border-2 border-black font-bold text-2xl">
        Global Top 1
      </h1>

      <div className="flex flex-col items-center justify-center w-full gap-10">
        <IframeYoutube tracksList={tracksList} />

        <Miniplayer track={tracksList[0]?.track} />

        <div className="flex justify-between items-center w-full">
          <Image
            src={tracksList[0]?.track.album.images[0].url}
            alt="Album Cover"
            width={450}
            height={450}
            priority
          />
          <InterviewList
            artistName={tracksList[0]?.track.artists[0].name}
            className="w-[450px] mx-[0px] h-[450px] "
            slice={3}
          />
        </div>
      </div>
    </div>
  );
}
