import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import HeaderMain from '@/shared/components/HeaderMain';
import InterviewList from '@/features/homepage/components/InterviewList';
import ChartTop5 from '@/features/homepage/components/ChartTop5';
// import YoutubePlaylist from '@/features/homepage/components/YoutubePlaylist';

import { searchInterviews } from '@/shared/hooks/searchInterviews';
import { getTrackList } from '@/shared/hooks/getTrackList';
const YoutubePlaylist = dynamic(() => import('@/features/homepage/components/YoutubePlaylist'));
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to the home page',
};

export const revalidate = 60 * 60 * 24;

export default async function HomePage() {
  const LATEST_INTERVIEWS_QUERY = ` artist interview site:rollingstone.com OR site:billboard.com OR site:pitchfork.com OR site:complex.com`;

  // 페이지 데이터 미리 가져오기
  const [tracksListResult, interviewsResult] = await Promise.allSettled([
    getTrackList({ playlistId: '1PcB3QM5sGbzFU5D9CbEGB' }),
    searchInterviews(LATEST_INTERVIEWS_QUERY),
  ]);

  const tracksList = tracksListResult.status === 'fulfilled' ? tracksListResult.value : [];
  const interviews = interviewsResult.status === 'fulfilled' ? interviewsResult.value : [];

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
                  priority
                />
              </header>
            </div>
            <div className="flex items-center justify-between flex-col w-[400px] h-[600px]">
              <InterviewList interviews={interviews} slice={4} className="mx-auto h-[800px]" />
            </div>
          </main>
          <div className="mx-auto mt-10 w-full">
            <ChartTop5 tracksList={tracksList} />
          </div>
          <Suspense fallback={<div className="h-[200px] w-full bg-gray-200 animate-pulse mt-10" />}>
            <YoutubePlaylist />
          </Suspense>
        </div>
      </div>
      <div className="w-full bg-[#000000] mt-10 h-100 text-white"> footer</div>
    </div>
  );
}
