'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import SubmitInput from '@/shared/components/SubmitInput';
import { useTrackList, useAllTracks } from '@/shared/hooks/getTrackList';

const TrackComponent = dynamic(() => import('@/features/playlist/components/TrackComponent'), {
  ssr: false,
});
const PlaylistInterviewList = dynamic(
  () => import('@/features/playlist/components/PlaylistInterviewList'),
  { ssr: false }
);
//https://open.spotify.com/playlist/6kVEeyek3h3P1eZZMxRQgD?si=0p17ZaUmQN6c5Tf69JiH5g
// https://open.spotify.com/playlist/6kVEeyek3h3P1eZZMxRQgD

// https://open.spotify.com/album/0EiI8ylL0FmWWpgHVTsZjZ?si=LE7tAMWqTRSVSJU2bHoc7g
// // https://open.spotify.com/album/0EiI8ylL0FmWWpgHVTsZjZ
export default function SubmitPlaylist() {
  const [submitUrl, setSubmitUrl] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [page, setPage] = useState(0);

  const limit = 10;
  const offset = page * limit;

  // 플레이리스트 ID를 추출하는 함수
  const extractPlaylistId = (url: string): string => {
    if (url.startsWith('https://open.spotify.com/playlist/')) {
      const regex = /(?:playlist[\/:])([a-zA-Z0-9]+)/;
      const match = url.match(regex);
      return match ? match[1] : '';
    } else if (url.startsWith('https://open.spotify.com/album/')) {
      const regex = /(?:album[\/:])([a-zA-Z0-9]+)/;
      const match = url.match(regex);
      return match ? match[1] : '';
    }
    return '';
  };

  // 플레이리스트 ID를 제출하는 함수
  const handleSubmit = (input: string) => {
    const id = extractPlaylistId(input.trim());

    if (input.trim() === '') {
      alert('플레이리스트 ID가 비어있어요!');
      setShowChart(false);
      return;
    }
    setPlaylistId(id.trim());
    setPage(0);
    setShowChart(true);
    setSubmitUrl('');
  };

  const { data: pageTracks, isLoading, error } = useTrackList(playlistId, offset, limit);
  const { data: allTracks } = useAllTracks(playlistId);

  const isValidData = Array.isArray(pageTracks) && pageTracks.length > 0;
  const isLastPage = allTracks ? offset + limit >= allTracks.length : true;
  console.log(submitUrl);

  return (
    <div>
      <SubmitInput
        placeholder="플레이리스트 ID를 넣어주세요 (예: https://open.spotify.com/playlist/...)"
        value={submitUrl}
        onChange={(e) => setSubmitUrl(e.target.value)}
        onSubmit={() => handleSubmit(submitUrl)}
      />

      {showChart && (
        <>
          {isLoading && <TrackComponent title="Top Tracks" isLoading={true} />}
          {error && <p>오류 발생: {error.message}</p>}
          {isValidData ? (
            <>
              <TrackComponent
                link={true}
                tracksList={pageTracks}
                title="차트 제목"
                page={page}
                limit={limit}
              />
            </>
          ) : (
            <></>
          )}
          <div className="flex gap-4 mt-4">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
              이전
            </button>

            <button onClick={() => setPage((p) => p + 1)} disabled={!isValidData || isLastPage}>
              다음
            </button>
          </div>
        </>
      )}

      <PlaylistInterviewList trackData={allTracks} />
    </div>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';

// import SubmitInput from '@/shared/components/SubmitInput';
// import { useTrackList, useAllTracks } from '@/shared/hooks/getTrackList';

// export default function SubmitPlaylist() {
//   const [submitUrl, setSubmitUrl] = useState('');
//   const [playlistId, setPlaylistId] = useState('');
//   const [showChart, setShowChart] = useState(false);
//   const [page, setPage] = useState(0);

//   // 👉 지연 로딩할 컴포넌트 상태
//   const [TrackComponent, setTrackComponent] = useState<any>(null);
//   const [PlaylistInterviewList, setPlaylistInterviewList] = useState<any>(null);

//   const limit = 10;
//   const offset = page * limit;

//   const extractPlaylistId = (url: string): string => {
//     if (url.startsWith('https://open.spotify.com/playlist/')) {
//       const regex = /(?:playlist[\/:])([a-zA-Z0-9]+)/;
//       const match = url.match(regex);
//       return match ? match[1] : '';
//     } else if (url.startsWith('https://open.spotify.com/album/')) {
//       const regex = /(?:album[\/:])([a-zA-Z0-9]+)/;
//       const match = url.match(regex);
//       return match ? match[1] : '';
//     }
//     return '';
//   };

//   // 🧠 지연 import + 상태 업데이트
//   const lazyImportComponents = async () => {
//     if (!TrackComponent) {
//       const { default: LoadedTrack } = await import(
//         '@/features/playlist/components/TrackComponent'
//       );
//       setTrackComponent(() => LoadedTrack);
//     }

//     if (!PlaylistInterviewList) {
//       const { default: LoadedInterview } = await import(
//         '@/features/playlist/components/PlaylistInterviewList'
//       );
//       setPlaylistInterviewList(() => LoadedInterview);
//     }
//   };

//   const handleSubmit = async (input: string) => {
//     const trimmed = input.trim();
//     const id = extractPlaylistId(trimmed);

//     if (!trimmed) {
//       alert('플레이리스트 ID가 비어있어요!');
//       setShowChart(false);
//       return;
//     }

//     await lazyImportComponents(); // 🔥 동적으로 import!

//     setPlaylistId(id);
//     setPage(0);
//     setShowChart(true);
//     setSubmitUrl('');
//   };

//   const { data: pageTracks, isLoading, error } = useTrackList(playlistId, offset, limit);
//   const { data: allTracks } = useAllTracks(playlistId);

//   const isValidData = Array.isArray(pageTracks) && pageTracks.length > 0;
//   const isLastPage = allTracks ? offset + limit >= allTracks.length : true;

//   // ✅ 테스트 자동 제출
//   useEffect(() => {
//     const testUrl = localStorage.getItem('test-playlist-url');
//     if (testUrl) {
//       handleSubmit(testUrl);
//     }
//   }, []);

//   return (
//     <div>
//       <SubmitInput
//         placeholder="플레이리스트 ID를 넣어주세요 (예: https://open.spotify.com/playlist/...)"
//         value={submitUrl}
//         onChange={(e) => setSubmitUrl(e.target.value)}
//         onSubmit={() => handleSubmit(submitUrl)}
//       />

//       {showChart && TrackComponent && (
//         <>
//           {isLoading && <TrackComponent title="Top Tracks" isLoading={true} />}
//           {error && <p>오류 발생: {error.message}</p>}
//           {isValidData && (
//             <TrackComponent
//               link={true}
//               tracksList={pageTracks}
//               title="차트 제목"
//               page={page}
//               limit={limit}
//             />
//           )}

//           <div className="flex gap-4 mt-4">
//             <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
//               이전
//             </button>
//             <button onClick={() => setPage((p) => p + 1)} disabled={!isValidData || isLastPage}>
//               다음
//             </button>
//           </div>
//         </>
//       )}

//       {PlaylistInterviewList && allTracks && allTracks.length > 0 && (
//         <PlaylistInterviewList trackData={allTracks} />
//       )}
//     </div>
//   );
// }
