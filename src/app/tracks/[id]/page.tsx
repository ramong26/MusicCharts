import getTrackId from '@/features/tracks/hooks/getTrackId';
import getTrackIdAlbum from '@/features/tracks/hooks/getTrackIdAlbum';

import HeaderMain from '@/shared/components/HeaderMain/HeaderMain';
import TrackDescription from '@/features/tracks/components/TrackDescription/TrackDescription';

import TrackClient from '@/features/tracks/components/TrackClient';

export const metadata = {
  title: 'Track Page',
  description: 'Details about the track',
};

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrackPage({ params }: PageProps) {
  const { id } = await params;
  const trackId = id;

  // trackId로 트랙 정보 받아옴
  const track = await getTrackId(trackId);

  // trackId로 앨범 정보 받아옴
  const album = await getTrackIdAlbum(track);

  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex flex-col mt-[250px] gap-4 h-[617px] w-[1043px] mx-auto">
        {album && <TrackDescription album={album} />}
        {album && <TrackClient trackId={track.id} album={album} track={track} />}
      </main>
    </div>
  );
}
