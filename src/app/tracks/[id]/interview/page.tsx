import getTrackId from '@/features/tracks/hooks/getTrackId';
import getArtist from '@/features/tracks/hooks/getArtist';

import HeaderMain from '@/shared/components/HeaderMain';
import ArtistProfile from '@/features/tracks/interview/components/ArtistProfile';
import ArtistInterview from '@/features/tracks/interview/components/ArtistInterview';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InterviewPage({ params }: PageProps) {
  const { id } = await params;
  const trackId = id;

  const track = await getTrackId(trackId);
  const artistId = track.artists[0]?.id;

  if (!artistId) {
    return <div className="text-center mt-10">아티스트 정보를 찾을 수 없습니다.</div>;
  }

  const artist = await getArtist(artistId);

  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex mt-[188px] gap-4 h-fit w-[1043px] items-center justify-center mx-auto">
        <div className="flex flex-col gap-10 ">
          <ArtistProfile artist={artist} />
          <ArtistInterview artist={artist} />
        </div>
      </main>
    </div>
  );
}
