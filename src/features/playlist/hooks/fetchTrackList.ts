import { useQuery } from "@tanstack/react-query";
import { useTrackList } from "@/shared/hooks/useTrackList";

const ONE_HOUR = 1000 * 60 * 60;
export const fetchTrackList = (playlistId: string) => {
  return useQuery({
    queryKey: ["track-list", playlistId],
    queryFn: () => useTrackList({ playlistId }),
    enabled: !!playlistId, 
    staleTime: ONE_HOUR, 
  });
};