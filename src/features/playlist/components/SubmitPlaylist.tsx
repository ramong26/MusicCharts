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
    <section className="mt-16 max-w-6xl mx-auto px-4">
      {/* 타이틀 */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-black uppercase mb-8">
        Submit Your Playlist
      </h2>

      {/* 입력 박스 */}
      <div className="bg-yellow-200 border-4 border-black p-6 md:p-8 rounded-2xl shadow-[6px_6px_0px_black] flex flex-col gap-4">
        <SubmitInput
          placeholder="Spotify 플레이리스트 링크를 넣어주세요!"
          value={submitUrl}
          onChange={(e) => setSubmitUrl(e.target.value)}
          onSubmit={() => handleSubmit(submitUrl)}
        />
        <p className="text-xs md:text-sm text-gray-800 font-semibold text-center">
          🔑 공개된 플레이리스트만 제출 가능 / 📎 Spotify 공식 리스트는 불가
        </p>
      </div>

      {/* 결과 */}
      {showChart && (
        <div className="mt-10">
          {isLoading && <TrackComponent title="Top Tracks" isLoading />}
          {error && <p className="text-red-600 text-center font-bold">❌ 오류 발생: {error}</p>}

          {!isLoading && !error && (
            <>
              {isValidData ? (
                <TrackComponent
                  link
                  tracksList={pageTracks}
                  title="차트 미리보기"
                  page={page}
                  limit={limit}
                />
              ) : (
                <p className="text-center text-gray-700 font-semibold">
                  트랙을 표시할 수 없습니다 😢 <br />
                  플레이리스트가 비어있거나 올바른 링크인지 확인해주세요.
                </p>
              )}

              {/* 페이지네이션 버튼 */}
              <div className="flex gap-6 mt-8 justify-center">
                <button
                  onClick={prevPage}
                  disabled={page === 0}
                  className="px-6 py-2 bg-pink-400 border-2 border-black font-bold rounded-lg shadow-[3px_3px_0px_black] hover:bg-black hover:text-pink-400 transition disabled:opacity-40"
                >
                  이전
                </button>
                <button
                  onClick={nextPage}
                  disabled={isLoading || isLastPage}
                  className="px-6 py-2 bg-pink-400 border-2 border-black font-bold rounded-lg shadow-[3px_3px_0px_black] hover:bg-black hover:text-pink-400 transition disabled:opacity-40"
                >
                  다음
                </button>
              </div>
            </>
          )}
          <PlaylistInterviewList trackData={allTracks} />
        </div>
      )}
    </section>
  );
}
