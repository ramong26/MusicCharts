import getTrackId from '@/features/tracks/hooks/getTrackId';
import getTrackIdAlbum from '@/features/tracks/hooks/getTrackIdAlbum';
import { getYoutubeTrackIdVideo } from '@/features/tracks/hooks/getYoutube';
import { searchInterviews } from '@/features/tracks/hooks/searchInterviews';

import HeaderMain from '@/shared/components/HeaderMain';
import TrackDescription from '@/features/tracks/components/TrackDescription';
import TrackList from '@/features/tracks/components/TrackList';
import TrackComments from '@/features/tracks/components/TrackComments';

interface TrackPageProps {
  params: { id: string };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const trackId = params.id;
  // trackId로 트랙 정보 받아옴
  const track = await getTrackId(trackId);
  console.log('track', track);
  // trackId로 앨범 정보 받아옴
  const album = await getTrackIdAlbum(track);
  // trackId로 유튜브 비디오 정보 받아옴
  const videos = await getYoutubeTrackIdVideo(track.name);
  // // trackId로 인터뷰 정보 받아옴
  const interviews = await searchInterviews(track.name);

  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex flex-col mt-[250px] gap-4 h-[617px] w-[1043px] mx-auto">
        {track && <TrackDescription album={track.album} />}
        <TrackList />
        <TrackComments />
      </main>
    </div>
  );
}
