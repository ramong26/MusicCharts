import { getYoutubeTrackFetchVideo } from '@/features/tracks/hooks/getYoutube';
import { TrackItem } from '@/shared/types/SpotifyTrack';

export default async function IframeYoutube({ tracksList }: { tracksList: TrackItem[] }) {
  if (!tracksList || tracksList.length === 0) {
    return <div>트랙이 없습니다.</div>;
  }

  const trackMusicVideo = await getYoutubeTrackFetchVideo(
    `${tracksList[0]?.track.artists[0].name} ${tracksList[0]?.track.name} official music video`
  );

  if (!trackMusicVideo) {
    return <div>트랙 정보가 없습니다.</div>;
  }

  const youtubeUrl = `https://www.youtube.com/embed/${trackMusicVideo}`;
  console.log(youtubeUrl);
  return (
    <iframe
      className="w-full h-[400px] rounded-lg"
      src={youtubeUrl}
      title={trackMusicVideo}
      frameBorder="0"
      allowFullScreen
    />
  );
}
