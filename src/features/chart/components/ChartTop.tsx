import Image from 'next/image';

import InterviewList from '@/features/homepage/components/InterviewList';
import Miniplayer from '@/features/chart/components/Miniplayer';
import { getYoutubeTrackIdVideo } from '@/features/tracks/hooks/getYoutube';
import { TrackItem } from '@/shared/types/SpotifyTrack';
import IframeYoutube from '@/features/chart/components/IframeYoutube';

export default async function ChartTop({ tracksList }: { tracksList: TrackItem[] }) {
  // 뮤직비디오를 가져오는 함수 호출
  const trackMusicVideo = await getYoutubeTrackIdVideo(
    `${tracksList[0]?.track.artists[0].name} ${tracksList[0]?.track.name} official music video`
  );

  if (!trackMusicVideo || trackMusicVideo.length === 0) {
    return <div>뮤직비디오를 찾을 수 없습니다.</div>;
  }
  if (!tracksList || tracksList.length === 0) {
    return <div>트랙이 없습니다.</div>;
  }
  return (
    <div className="relative border-3 border-black p-10 mt-10 max-w-7xl mx-auto bg-white">
      <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black  text-white px-6 py-2 border-2 border-black font-bold text-2xl">
        Global Top 1
      </h1>

      <div className="flex flex-col items-center justify-center w-full gap-10">
        <IframeYoutube videoId={trackMusicVideo[0]?.videoId} />

        <Miniplayer track={tracksList[0]?.track} />
        <div className="flex justify-between items-center w-full">
          {/*클릭시 해당 트랙 페이지로 이동*/}
          <Image
            src={tracksList[0]?.track.album.images[0].url}
            alt="Album Cover"
            width={400}
            height={400}
          />
          <InterviewList
            artistName={tracksList[0]?.track.artists[0].name}
            className="w-[500px] mx-[0px]"
            slice={3}
          />
        </div>
      </div>
    </div>
  );
}
// }
// 'use client';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// import InterviewList from '@/features/homepage/components/InterviewList';
// import { getYoutubeTrackIdVideo } from '@/features/tracks/hooks/getYoutube';

// import { TrackItem } from '@/shared/types/SpotifyTrack';

// export default function ChartTop({ tracksList }: { tracksList: TrackItem[] }) {
//   const [videoId, setVideoId] = useState<string | null>(null);
//   const [isEmbedded, setIsEmbedded] = useState(false);

//   useEffect(() => {
//     async function fetchVideoId() {
//       const track = tracksList[0]?.track.name;
//       const artist = tracksList[0]?.track.artists[0].name;
//       const album = tracksList[0]?.track.album.name;

//       const trackMusicVideo = await getYoutubeTrackIdVideo(
//         `${artist} ${track} official music video`
//       );
//       const albumMusicVideo = await getYoutubeTrackIdVideo(
//         `${album} ${artist} official music video`
//       );
//       if (trackMusicVideo?.[0]?.videoId) {
//         setVideoId(trackMusicVideo[0].videoId);
//       } else if (albumMusicVideo?.[0]?.videoId) {
//         setVideoId(albumMusicVideo[0].videoId);
//       } else {
//         setVideoId(null);
//       }
//     }

//     fetchVideoId();
//   }, [tracksList]);

//   const handleIframeError = () => {
//     setIsEmbedded(true);
//   };

//   if (!tracksList || tracksList.length === 0) {
//     return <div>트랙이 없습니다.</div>;
//   }

//   return (
//     <div className="relative border-3 border-black p-10 mt-10 max-w-7xl mx-auto bg-white">
//       <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black  text-white px-6 py-2 border-2 border-black font-bold text-2xl">
//         Global Top 1
//       </h1>

//       <div className="flex flex-col items-center justify-center w-full gap-10">
//         {videoId && !isEmbedded ? (
//           <iframe
//             width="100%"
//             height="500"
//             src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
//             title="YouTube video player"
//             onError={handleIframeError}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         ) : (
//           <div>뮤직비디오를 찾을 수 없습니다.</div>
//         )}
//         {/* <Miniplayer track={tracksList[0]?.track} /> */}
//         <div className="flex justify-between items-center w-full">
//           {/*클릭시 해당 트랙 페이지로 이동*/}
//           <Image
//             src={tracksList[0]?.track.album.images[0].url}
//             alt="Album Cover"
//             width={400}
//             height={400}
//           />
//           <InterviewList
//             artistName={tracksList[0]?.track.artists[0].name}
//             className="w-[500px] mx-[0px]"
//             slice={3}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
