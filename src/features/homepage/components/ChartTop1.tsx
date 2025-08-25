import Image from 'next/image';

import InterviewList from '@/features/homepage/components/InterviewList';

import { TrackItem } from '@/shared/types/spotifyTrack';

export default function ChartTop1({ tracksList }: { tracksList: TrackItem[] }) {
  return (
    <div className="mt-[72px] mx-[100px] mb-[72px] flex items-center justify-between">
      <Image
        width={627}
        height={627}
        src={tracksList[0]?.track.album.images[0].url}
        alt="Album Cover"
        priority
      />

      <div className="flex flex-col w-[750px] h-[627px] items-center justify-between">
        <div className="flex gap-5 flex-col items-center">
          <div className="font-bold text-[70px]">{tracksList[0]?.track.name}</div>
          <div className="font-medium text-[30px] ">
            {tracksList[0]?.track.artists.map((artist) => artist.name).join(', ')}
          </div>
        </div>
        <InterviewList className=" w-[727px]" slice={3} />
      </div>
    </div>
  );
}
