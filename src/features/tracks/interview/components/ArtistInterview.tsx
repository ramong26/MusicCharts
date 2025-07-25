'use client';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ArtistInterviewComponent from '@/features/tracks/interview/components/ArtistInterviewComponent';

import { Artist } from '@/shared/types/SpotifyTrack';
import { getCombinedInterviews } from '@/shared/hooks/searchInterviews';

export default function ArtistInterview({ artist }: { artist: Artist }) {
  const queryClient = useQueryClient();

  const [offset, setOffset] = useState<number>(0);
  const limit = 5;

  const { data: interviews = [], isLoading } = useQuery({
    queryKey: ['artistInterviews', artist?.name, offset],
    queryFn: () => getCombinedInterviews(artist?.name || '', offset, limit),
    placeholderData: (prevData) => prevData,
  });

  useEffect(() => {
    if (!artist?.name) return;
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
      >
        이전
      </button>
      <button onClick={() => setOffset((prev) => prev + limit)}>다음</button>
    </>
  );
}
