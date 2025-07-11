'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import SubmitInput from '@/shared/components/SubmitInput';
import { useTrackList, useAllTracks } from '@/shared/hooks/getTrackList';

const TrackComponent = dynamic(
  () => import('@/features/playlist/components/TrackComponent'),
  { ssr: false }
);
const PlaylistInterviewList = dynamic(
  () => import('@/features/playlist/components/PlaylistInterviewList'),
  { ssr: false }
);

export default function SubmitPlaylist() {
  const [submitUrl, setSubmitUrl] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [page, setPage] = useState(0);

  const limit = 10;
  const offset = page * limit;

  const handleSubmit = (id: string) => {
    if (!id) {
      console.error('플레이리스트 ID가 비어있음');
      setShowChart(false);
      return;
    }
    setPlaylistId(id.trim());
    setPage(0); // 새 검색 시 첫 페이지로 초기화
    setShowChart(true);
  };

  const {
    data: pageTracks,
    isLoading,
    error,
  } = useTrackList(playlistId, offset, limit);
  const { data: allTracks } = useAllTracks(playlistId);

  const isValidData = Array.isArray(pageTracks) && pageTracks.length > 0;

  const isLastPage = allTracks ? offset + limit >= allTracks.length : true;

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
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              이전
            </button>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!isValidData || isLastPage}
            >
              다음
            </button>
          </div>
        </>
      )}

      <PlaylistInterviewList trackData={allTracks} />
    </div>
  );
}
