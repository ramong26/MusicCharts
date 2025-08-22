'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import LazyComponent from '@/shared/components/LazyComponent';

import type { Album } from '@/shared/types/spotifyTrack';
import type { Track } from '@/shared/types/spotifyTrack';
import { useTrackStore } from '@/stores/trackStore';

const TrackList = dynamic(() => import('@/features/tracks/components/TrackList'), {
  ssr: false,
});

const TrackComments = dynamic(
  () => import('@/features/tracks/components/TrackComments/TrackComments'),
  {
    ssr: false,
  }
);

export default function TrackClient({
  album,
  trackId,
  track,
}: {
  album: Album;
  trackId: string;
  track: Track;
}) {
  // zustand로 전역관리
  const { setAlbum, setTrack, setTrackId } = useTrackStore();

  useEffect(() => {
    setAlbum(album);
    setTrack(track);
    setTrackId(trackId);
  }, [album, track, setAlbum, setTrack, setTrackId, trackId]);

  return (
    <>
      <TrackList />
      <LazyComponent>
        <TrackComments />
      </LazyComponent>
    </>
  );
}
