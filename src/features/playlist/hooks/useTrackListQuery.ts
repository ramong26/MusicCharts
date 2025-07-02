import { useQuery } from "@tanstack/react-query";
import { useTrackList } from "@/shared/hooks/useTrackList";

export const useTrackListQuery = (playlistId: string) => {
  return useQuery({
    queryKey: ["track-list", playlistId],
    queryFn: () => useTrackList({ playlistId }),
    enabled: !!playlistId, 
    staleTime: 1000 * 60 * 10 * 6, 
  });
};