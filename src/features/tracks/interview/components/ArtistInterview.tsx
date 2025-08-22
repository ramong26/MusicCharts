'use client';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ArtistInterviewComponent from '@/features/tracks/interview/components/ArtistInterviewComponent';

import { Artist } from '@/shared/types/spotifyTrack';
import { getCombinedInterviews } from '@/shared/hooks/searchInterviews';

export default function ArtistInterview({ artist }: { artist: Artist }) {
  const queryClient = useQueryClient();

  const [offset, setOffset] = useState<number>(0);
  const limit = 5;

  // fetch 아티스트 인터뷰
  const { data, isLoading } = useQuery({
    queryKey: ['artistInterviews', artist.name, offset],
    queryFn: () => getCombinedInterviews(artist.name, offset, limit),
    placeholderData: (prevData) => prevData,
  });

  const interviews = data?.results ?? [];
  const totalCount = data?.totalCount ?? 0;

  // 다음 페이지를 미리 가져오기 프리페치
  useEffect(() => {
    if (offset + limit < totalCount) {
      queryClient.prefetchQuery({
        queryKey: ['artistInterviews', artist.name, offset + limit],
        queryFn: () => getCombinedInterviews(artist.name, offset + limit, limit),
      });
    }
  }, [artist, offset, queryClient, totalCount]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {interviews.map((interview) => (
        <ArtistInterviewComponent key={interview.link} artistInterview={interview} />
      ))}
      <div className="flex pb-10 justify-center items-center">
        <button
          className="cursor-pointer text-black"
          disabled={offset === 0}
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
        >
          이전
        </button>
        <span className="mx-4">
          {Math.ceil((offset + 1) / limit)} / {Math.ceil(totalCount / limit)}
        </span>
        <button
          className="cursor-pointer text-black "
          disabled={offset + limit >= totalCount}
          onClick={() => setOffset((prev) => prev + limit)}
        >
          다음
        </button>
      </div>
    </>
  );
}
