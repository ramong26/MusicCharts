import getTopTrackPlaylist from "@/features/chart/hooks/getTopTrackPlaylist";

export default async function useTrackList() {
  const playlistId = "2fmFoUa7WNxIfvUg2jghxD";
  const tracksList = await getTopTrackPlaylist(playlistId);

  return tracksList;
}

// 사용법:   const tracksList = await useTrackList();
