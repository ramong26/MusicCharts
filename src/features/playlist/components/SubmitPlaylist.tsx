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
// https://open.spotify.com/playlist/6kVEeyek3h3P1eZZMxRQgD?si=0p17ZaUmQN6c5Tf69JiH5g
// https://open.spotify.com/playlist/6kVEeyek3h3P1eZZMxRQgD

// https://open.spotify.com/album/0EiI8ylL0FmWWpgHVTsZjZ?si=LE7tAMWqTRSVSJU2bHoc7g
// https://open.spotify.com/album/0EiI8ylL0FmWWpgHVTsZjZ
export default function SubmitPlaylist() {
  const [submitUrl, setSubmitUrl] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [page, setPage] = useState(0);

  const limit = 10;
  const offset = page * limit;

  // 플레이리스트 ID를 추출하는 함수
  const extractPlaylistId = (url: string): string => {
    const regex = /(?:playlist[\/:])([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // 플레이리스트 ID를 제출하는 함수
  const handleSubmit = (input: string) => {
    const id = extractPlaylistId(input.trim());

    if (!id) {
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
        placeholder="플레이리스트 ID를 넣어주세요"
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
