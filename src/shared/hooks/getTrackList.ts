import { useQuery } from '@tanstack/react-query';

import getTopTrackPlaylist from '@/features/chart/hooks/getTopTrackPlaylist';
import getAllTracks from '@/shared/hooks/getAllTracks';

const ONE_HOUR = 1000 * 60 * 60;

export async function getTrackList({
  playlistId,
  offset = 0,
  limit = 10,
}: {
  playlistId?: string;
  offset?: number;
  limit?: number;
} = {}) {
  const finalPlaylistId = playlistId || '2fmFoUa7WNxIfvUg2jghxD';
  const tracksList = await getTopTrackPlaylist({
    playlistId: finalPlaylistId,
    offset,
    limit,
  });

  return tracksList;
}
// 사용법:   const tracksList = await getTrackList();

export const useTrackList = (playlistId: string, offset = 0, limit = 50) => {
  return useQuery({
    queryKey: ['track-list', playlistId, offset, limit],
    queryFn: () => getTopTrackPlaylist({ playlistId, offset, limit }),
    enabled: !!playlistId,
    staleTime: ONE_HOUR,
  });
};

export const useAllTracks = (playlistId?: string) => {
  return useQuery({
    queryKey: ['all-tracks', playlistId],
    queryFn: () => {
      if (!playlistId) return Promise.resolve([]);
      return getAllTracks(playlistId);
    },
    enabled: !!playlistId,
    staleTime: ONE_HOUR,
  });
};
