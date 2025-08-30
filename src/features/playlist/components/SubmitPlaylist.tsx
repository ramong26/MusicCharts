'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

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
  const { data: allTracks = [] } = useAllTracks(playlistId);

  // 상위 트랙 메모로 저장
  const topTracks = useMemo(() => {
    return allTracks.slice(0, 100);
  }, [allTracks]);

  // 유효성 검사
  const isValidData = Array.isArray(pageTracks) && pageTracks.length > 0;
  const isLastPage = allTracks ? offset + limit >= allTracks.length : true;

  return (
    <section className="mt-16 min-h-screen w-fit flex flex-col  px-4">
      <h1 className="flex items-center justify-center mb-5 lg:text-[56px] text-[40px] font-extrabold leading-tight text-black uppercase tracking-wide drop-shadow-[3px_3px_0px_#FFD460]">
        Submit Your Playlist
      </h1>

      {/* 입력 박스 */}
      <div className="flex flex-col items-center justify-center">
        <div className=" w-[1120px] bg-white border-2 border-black p-6 md:p-8 rounded-xl shadow-md flex flex-col gap-4">
          <SubmitInput
            placeholder="Spotify 플레이리스트 링크를 넣어주세요!"
            value={submitUrl}
            onChange={(e) => setSubmitUrl(e.target.value)}
            onSubmit={() => handleSubmit(submitUrl)}
          />
          <p className="text-xs md:text-sm text-gray-700 font-medium text-center">
            🔑 공개된 플레이리스트만 제출 가능 / 📎 Spotify 공식 리스트는 불가
          </p>
        </div>

        {/* 트랙 카드 리스트 */}
        {showChart && (
          <div className="mt-10 w-full">
            {isLoading && <TrackComponent title="트랙 미리보기" isLoading />}
            {error && <p className="text-red-600 text-center font-bold">❌ 오류 발생: {error}</p>}

            {isValidData && (
              <TrackComponent
                link
                tracksList={pageTracks}
                title="트랙 미리보기"
                page={page}
                limit={limit}
              />
            )}

            {!isValidData && !isLoading && !error && (
              <p className="text-center text-gray-700 font-semibold">
                트랙을 표시할 수 없습니다 😢 <br />
                플레이리스트가 비어있거나 올바른 링크인지 확인해주세요.
              </p>
            )}

            {/* 페이지네이션 버튼 */}
            <div className="flex gap-6 mt-10 justify-center">
              <button
                onClick={prevPage}
                disabled={page === 0 || isLoading}
                className={`px-5 py-2 bg-black text-white border-2 border-black font-bold rounded-md cursor-pointer transition
                  ${
                    page === 0 || isLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-white hover:text-black'
                  }`}
              >
                {isLoading ? '로딩...' : '이전'}
              </button>
              <button
                onClick={nextPage}
                disabled={isLastPage || isLoading}
                className={`px-5 py-2 bg-black text-white border-2 border-black font-bold rounded-md cursor-pointer transition
                  ${
                    isLastPage || isLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-white hover:text-black'
                  }`}
              >
                {isLoading ? '로딩...' : '다음'}
              </button>
            </div>

            {/* 아티스트 인터뷰 리스트 */}
            <PlaylistInterviewList
              key={topTracks.map((track) => track.track.id).join('-')}
              trackData={topTracks}
            />
          </div>
        )}
      </div>
    </section>
  );
}
