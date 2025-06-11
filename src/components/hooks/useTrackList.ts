import getTopTrackPlaylist from "@/features/chart/hooks/getTopTrackPlaylist";

export default async function useTrackList() {
  const playlistId = "2fmFoUa7WNxIfvUg2jghxD";
  const tracksList = await getTopTrackPlaylist(playlistId);
  console.log(tracksList);
  return tracksList;
}
