import { Album } from '@/shared/types/SpotifyTrack';
import TrackComments from '@/features/playlist/components/TrackComponent';
export default function TrackList({ album }: { album: Album }) {
  console.log('TrackList component rendered with album:', album);

  if (!album) {
    return <div>앨범 정보가 없습니다.</div>;
  }
  const tracksList = album.tracks.items.map((item) => ({
    track: {
      album,
      artists: item.artists,
      name: item.name,
      id: item.id,
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <TrackComments
        title={album.name}
        tracksList={tracksList}
        className="h-auto"
      />
    </div>
  );
}
