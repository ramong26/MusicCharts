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

  // 페이지네이션을 위한 useEffect
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['artistInterviews', artist.name, offset + limit],
      queryFn: () => getCombinedInterviews(artist.name, offset + limit, limit),
    });
  }, [artist, offset, queryClient]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {interviews.map((interview) => (
        <ArtistInterviewComponent key={interview.link} artistInterview={interview} />
      ))}
      <button
        disabled={offset === 0}
        onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
        className="cursor-pointer"
      >
        이전
      </button>

      <button
        disabled={offset + limit >= totalCount}
        onClick={() => setOffset((prev) => prev + limit)}
        className="cursor-pointer"
      >
        다음
      </button>

      <p className="text-center mt-4">
        {offset / limit + 1} / {totalPages} 페이지, 총 {totalCount}개의 인터뷰
      </p>
    </>
  );
}
