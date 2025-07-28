'use client';
import { useEffect, useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ArtistInterviewComponent from '@/features/tracks/interview/components/ArtistInterviewComponent';

import { CombinedInterviewsResult } from '@/features/tracks/types/custom-search';
import { Artist } from '@/shared/types/SpotifyTrack';
import { getCombinedInterviews } from '@/shared/hooks/searchInterviews';

export default function ArtistInterview({ artist }: { artist: Artist }) {
  const queryClient = useQueryClient();
  const [offset, setOffset] = useState<number>(0);
  const limit = 5;

  // 리액트 쿼리를 사용하여 아티스트 인터뷰 검색 결과를 가져옴
  const { data, isLoading } = useQuery<CombinedInterviewsResult>({
    queryKey: ['artistInterviews', artist.name, offset],
    queryFn: () => getCombinedInterviews(artist.name, offset, limit),
    placeholderData: (prevData) => prevData,
  });

  const interviews = data?.results ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / limit);
  }, [totalCount]);
  // console.log('ArtistInterview 컴포넌트:', interviews, totalCount, totalPages);
  // 페이지네이션을 위한 useEffect
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['artistInterviews', artist.name, offset + limit],
      queryFn: () => getCombinedInterviews(artist.name, offset + limit, limit),
    });
  }, [artist, offset, queryClient]);

  const isNextState = offset + limit >= totalCount;
  const isPrevState = offset === 0;
  return (
    <div className="mb-10">
      {isLoading && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <div className="flex items-center justify-center h-[150px] gap-4 mb-4 p-4 bg-white rounded-lg shadow-md animate-pulse">
                {/* 로고 + 사이트 이름 */}
                <div className="flex flex-col items-center justify-center w-[90px] h-[90px] gap-2">
                  <div className="w-[60px] h-[60px] bg-gray-300 rounded-full" />
                  <div className="w-16 h-4 bg-gray-300 rounded" />
                </div>

                {/* 인터뷰 내용 부분 */}
                <div className="flex-1 space-y-2">
                  <div className="w-full h-4 bg-gray-300 rounded" />
                  <div className="w-[90%] h-4 bg-gray-300 rounded" />
                  <div className="w-[80%] h-4 bg-gray-300 rounded" />
                </div>

                {/* 링크 + 날짜 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-4 bg-gray-300 rounded" />
                  <div className="w-20 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {interviews.map((interview) => (
        <ArtistInterviewComponent key={interview.link} artistInterview={interview} />
      ))}

      <div className="flex justify-center gap-8 mt-4 text-lg text-gray-600 min-w-[1000px]">
        <button
          disabled={isPrevState}
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
          className={` ${isPrevState ? 'opacity-50' : 'cursor-pointer'}`}
        >
          이전
        </button>
        <p className="text-center">
          {offset / limit + 1} / {totalPages} 페이지, 총 {totalCount}개의 인터뷰
        </p>
        <button
          disabled={isNextState}
          onClick={() => setOffset((prev) => prev + limit)}
          className={` ${isNextState ? 'opacity-50' : 'cursor-pointer'}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
