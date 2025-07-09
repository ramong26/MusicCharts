'use client';

import { useEffect, useMemo, useState } from 'react';

import { TrackItem } from '@/shared/types/SpotifyTrack';
import { searchInterviews } from '@/features/tracks/hooks/searchInterviews';

interface PlaylistInterviewListProps {
  trackData?: TrackItem[];
}

export default function PlaylistInterviewList({
  trackData,
}: PlaylistInterviewListProps) {
  const [artistInterviews, setArtistInterviews] = useState<
    Record<string, string[]>
  >({});

  const [loadingArtists, setLoadingArtists] = useState<Set<string>>(new Set());

  // 중복 아티스트 이름 제거 후 정렬
  const artists = useMemo(() => {
    const set = new Set<string>();
    trackData?.forEach((track) => {
      const firstArtist = track.track?.artists?.[0];
      if (firstArtist) {
        set.add(firstArtist.name);
      }
    });
    return Array.from(set).sort();
  }, [trackData]);

  useEffect(() => {
    if (!artists.length) return;

    const fetchAll = async () => {
      const interviewResults = await Promise.all(
        artists.map((artist) => {
          return searchInterviews(artist);
        })
      );

      // interviewResults를 활용하는 로직 추가
      console.log(interviewResults);
    };

    fetchAll();
  }, [artists]);

  if (!trackData || trackData.length === 0) {
    return <p>트랙 데이터를 불러오는 중이거나 없습니다.</p>;
  }
  console.log('아티스트 인터뷰 검색 결과:', artistInterviews);
  return (
    <div className="relative border-3 border-black p-5 mt-10 bg-white w-full ">
      <h3 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 border-2 border-black font-bold text-2xl whitespace-nowrap">
        아티스트 인터뷰 검색 결과
      </h3>

      <div className="space-y-6 mt-10">
        {artists.map((artist) => (
          <div
            key={artist}
            className="flex flex-col border-b border-black pb-4 last:border-none cursor-pointer hover:bg-gray-100 transition"
          >
            <h4 className="text-xl font-semibold mb-3 text-gray-900">
              {artist}
            </h4>

            {loadingArtists.has(artist) ? (
              <p className="text-gray-500 italic">인터뷰를 검색 중입니다...</p>
            ) : (
              <ul className="list-disc list-inside space-y-2 ml-5">
                {artistInterviews[artist]?.length === 0 && (
                  <li className="text-gray-400 italic">
                    관련 인터뷰가 없습니다.
                  </li>
                )}
                {artistInterviews[artist]?.map((link, index) => (
                  <li key={link}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                    >
                      인터뷰 {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 'use client';

// import { useEffect, useMemo, useState } from 'react';

// import { TrackItem } from '@/shared/types/SpotifyTrack';
// import { searchInterviews } from '@/features/tracks/hooks/searchInterviews';

// interface PlaylistInterviewListProps {
//   trackData?: TrackItem[];
// }

// export default function PlaylistInterviewList({
//   trackData,
// }: PlaylistInterviewListProps) {
//   const [artistInterviews, setArtistInterviews] = useState<
//     Record<string, string[]>
//   >({});

//   const [loadingArtists, setLoadingArtists] = useState<Set<string>>(new Set());

//   // 중복 아티스트 이름 제거 후 정렬
//   const artists = useMemo(() => {
//     const set = new Set<string>();
//     trackData?.forEach((track) => {
//       const firstArtist = track.track?.artists?.[0];
//       if (firstArtist) {
//         set.add(firstArtist.name);
//       }
//     });
//     return Array.from(set).sort();
//   }, [trackData]);

//   useEffect(() => {
//     if (!artists.length) return;

//     const fetchAll = async () => {
//       const newResults: Record<string, string[]> = {};
//       const nextLoading = new Set(artists);

//       setLoadingArtists(nextLoading);

//       const interviewPromises = artists.map((artist) => {
//         return searchInterviews(artist)
//           .then((res) => ({
//             artist,
//             links: res.map((r) => r.link).slice(0, 5),
//           }))
//           .catch((error) => {
//             console.error(`인터뷰 fetch 실패: ${artist}`, error);
//             return { artist, links: [] };
//           });
//       });

//       const results = await Promise.allSettled(interviewPromises);

//       results.forEach((result) => {
//         if (result.status === 'fulfilled') {
//           const { artist, links } = result.value;
//           newResults[artist] = links;
//         }
//       });

//       setArtistInterviews((prev) => ({ ...prev, ...newResults }));
//       setLoadingArtists(new Set());
//     };

//     fetchAll();
//   }, [artists]);

//   if (!trackData || trackData.length === 0) {
//     return <p>트랙 데이터를 불러오는 중이거나 없습니다.</p>;
//   }
//   console.log('아티스트 인터뷰 검색 결과:', artistInterviews);
//   return (
//     <div className="relative border-3 border-black p-5 mt-10 bg-white w-full ">
//       <h3 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 border-2 border-black font-bold text-2xl whitespace-nowrap">
//         아티스트 인터뷰 검색 결과
//       </h3>

//       <div className="space-y-6 mt-10">
//         {artists.map((artist) => (
//           <div
//             key={artist}
//             className="flex flex-col border-b border-black pb-4 last:border-none cursor-pointer hover:bg-gray-100 transition"
//           >
//             <h4 className="text-xl font-semibold mb-3 text-gray-900">
//               {artist}
//             </h4>

//             {loadingArtists.has(artist) ? (
//               <p className="text-gray-500 italic">인터뷰를 검색 중입니다...</p>
//             ) : (
//               <ul className="list-disc list-inside space-y-2 ml-5">
//                 {artistInterviews[artist]?.length === 0 && (
//                   <li className="text-gray-400 italic">
//                     관련 인터뷰가 없습니다.
//                   </li>
//                 )}
//                 {artistInterviews[artist]?.map((link, index) => (
//                   <li key={link}>
//                     <a
//                       href={link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
//                     >
//                       인터뷰 {index + 1}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
