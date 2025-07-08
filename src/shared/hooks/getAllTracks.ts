import getTopTrackPlaylist from '@/features/chart/hooks/getTopTrackPlaylist';

export default async function getAllTracks(playlistId: string, limit = 50) {
  let offset = 0;
  let allTracks: any[] = [];
  let hasMore = true;
  while (hasMore) {
    const response = await getTopTrackPlaylist({ playlistId, offset, limit });
    if (!response || response.length === 0) {
      hasMore = false;
    } else {
      allTracks = allTracks.concat(response);
      offset += limit;
    }
    return allTracks;
  }
}
