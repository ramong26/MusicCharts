import getTopTrackPlaylist from "@/features/chart/hooks/getTopTrackPlaylist";

export async function useTrackList({
  playlistId,
}: { playlistId?: string } = {}) {
  const finalPlaylistId = playlistId || "2fmFoUa7WNxIfvUg2jghxD";
  const tracksList = await getTopTrackPlaylist(finalPlaylistId);

  return tracksList;
}

export function getTrackListFetch({
  playlistId,
}: { playlistId?: string } = {}) {
  const finalPlaylistId = playlistId || "2fmFoUa7WNxIfvUg2jghxD";
  return getTopTrackPlaylist(finalPlaylistId);
}
// 사용법:   const tracksList = await useTrackList();
