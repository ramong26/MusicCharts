import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import InterviewList from '@/features/homepage/components/InterviewList';
import ChartTop5 from '@/features/homepage/components/ChartTop5';
import ChartTop1 from '@/features/homepage/components/ChartTop1';
import { getTrackList } from '@/shared/hooks/getTrackList';

const YoutubePlaylist = dynamic(() => import('@/features/homepage/components/YoutubePlaylist'));

export const metadata = {
  title: 'Home Page',
  description: 'Welcome to the home page',
};

export const revalidate = 86400;

export default async function HomePage() {
  const tracksList = await getTrackList({ playlistId: '1PcB3QM5sGbzFU5D9CbEGB', limit: 5 });

  return (
    <>
      <ChartTop1 tracksList={tracksList} />
      <ChartTop5 tracksList={tracksList} />
      <div></div>
    </>
  );
}

// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { Suspense } from 'react';

// import InterviewList from '@/features/homepage/components/InterviewList';
// import ChartTop5 from '@/features/homepage/components/ChartTop5';

// import { getTrackList } from '@/shared/hooks/getTrackList';

// const YoutubePlaylist = dynamic(() => import('@/features/homepage/components/YoutubePlaylist'));

// export const metadata = {
//   title: 'Home Page',
//   description: 'Welcome to the home page',
// };

// export const revalidate = 86400;

// export default async function HomePage() {
//   const tracksList = await getTrackList({ playlistId: '1PcB3QM5sGbzFU5D9CbEGB' });

//   return (
//     <div className="h-screen ">
//       <div className="w-[1043px] mx-auto">
//         <div className="flex flex-col items-center justify-start h-full">
//           <main className="flex mt-[188px]  gap-4 h-[617px]">
//             <div className="flex items-center justify-center ">
//               <header className="w-[627px] h-[618px]">
//                 <Image
//                   src={tracksList[0]?.track.album.images[0].url}
//                   alt="Album Cover"
//                   width={627}
//                   height={627}
//                   priority
//                 />
//               </header>
//             </div>
//             <div className="flex items-center justify-between flex-col w-[400px] h-[600px]">
//               <InterviewList className="mx-auto h-[800px]" slice={4} />
//             </div>
//           </main>
//           <div className="mx-auto mt-10 w-full">
//             <ChartTop5 tracksList={tracksList} />
//           </div>
//           <Suspense fallback={<div className="h-[200px] w-full bg-gray-200 animate-pulse mt-10" />}>
//             <YoutubePlaylist />
//           </Suspense>
//         </div>
//       </div>
//       <div className="w-full bg-[#000000] mt-10 h-100 text-white"> footer</div>
//     </div>
//   );
// }
