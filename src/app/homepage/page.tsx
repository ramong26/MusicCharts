import Image from 'next/image';

import HeaderMain from '@/shared/components/HeaderMain';
import InterviewList from '@/features/homepage/components/InterviewList';
import ChartTop5 from '@/features/homepage/components/ChartTop5';
import YoutubePlaylist from '@/features/homepage/components/YoutubePlaylist';

import { getTrackList } from '@/shared/hooks/getTrackList';

export default async function HomePage() {
  const tracksList = await getTrackList({ playlistId: '1PcB3QM5sGbzFU5D9CbEGB' });

  return (
    <div className="h-screen ">
      <HeaderMain />
      <div className="w-[1043px] mx-auto">
        <div className="flex flex-col items-center justify-start h-full">
          <main className="flex mt-[188px]  gap-4 h-[617px]">
            <div className="flex items-center justify-center ">
              <header className="w-[627px] h-[618px]">
                <Image
                  src={tracksList[0]?.track.album.images[0].url}
                  alt="Album Cover"
                  width={627}
                  height={627}
                />
              </header>
            </div>
            <div className="flex items-center justify-between flex-col w-[400px] h-[600px]">
              <InterviewList className="mx-auto h-[800px]" slice={4} />
            </div>
          </main>
          <div className="mx-auto mt-10 w-full">
            <ChartTop5 tracksList={tracksList} />
          </div>
          <YoutubePlaylist />
        </div>
      </div>
      <div className="w-full bg-[#000000] mt-10 h-100 text-white"> footer</div>
    </div>
  );
}
