'use client';

import dynamic from 'next/dynamic';

import SubmitInput from '@/shared/components/SubmitInput';
import { useTrackList, useAllTracks } from '@/shared/hooks/getTrackList';
import usePagination from '@/shared/hooks/usePagination';
import { usePlaylistSubmit } from '@/features/playlist/hooks/SubmitPlaylist/usePlaylistSubmit';
const TrackComponent = dynamic(() => import('@/features/playlist/components/TrackComponent'), {
  ssr: false,
});
const PlaylistInterviewList = dynamic(
  () => import('@/features/playlist/components/PlaylistInterviewList/PlaylistInterviewList'),
  { ssr: false }
);

export default function SubmitPlaylist() {
  // 플레이리스트 제출 훅
  const { submitUrl, setSubmitUrl, playlistId, showChart, handleSubmit, error } =
    usePlaylistSubmit();

  // 페이지네이션 훅
  const limit = 10;
  const { page, offset, nextPage, prevPage } = usePagination(limit);

  // 트랙 목록 가져오기
  const { data: pageTracks, isLoading } = useTrackList(playlistId, offset, limit);
  const { data: allTracks } = useAllTracks(playlistId);

  // 유효성 검사
  const isValidData = Array.isArray(pageTracks) && pageTracks.length > 0;
  const isLastPage = allTracks ? offset + limit >= allTracks.length : true;

  return (
    <>
      <SubmitInput
        placeholder="플레이리스트 ID를 넣어주세요 (예: https://open.spotify.com/playlist/...)"
        value={submitUrl}
        onChange={(e) => setSubmitUrl(e.target.value)}
        onSubmit={() => handleSubmit(submitUrl)}
      />

      {showChart && (
        <>
          {isLoading && <TrackComponent title="Top Tracks" isLoading />}
          {error && <p>오류 발생: {error}</p>}

          {!isLoading && !error && (
            <>
              {isValidData ? (
                <TrackComponent
                  link
                  tracksList={pageTracks}
                  title="차트 제목"
                  page={page}
                  limit={limit}
                />
              ) : (
                <p>
                  트랙을 표시할 수 없습니다. 플레이리스트가 비어있거나 올바른 플레이리스트 ID를
                  입력했는지 확인해주세요.
                </p>
              )}

              <div className="flex gap-4 mt-4">
                <button onClick={prevPage} disabled={page === 0}>
                  이전
                </button>
                <button onClick={nextPage} disabled={isLoading || isLastPage}>
                  다음
                </button>
              </div>
            </>
          )}
          <PlaylistInterviewList trackData={allTracks} />
        </>
      )}
    </>
  );
}
