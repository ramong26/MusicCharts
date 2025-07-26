import getTrackId from '@/features/tracks/hooks/getTrackId';
import getArtist from '@/features/tracks/hooks/getArtist';

import HeaderMain from '@/shared/components/HeaderMain';
import ArtistProfile from '@/features/tracks/interview/components/ArtistProfile';
import ArtistInterview from '@/features/tracks/interview/components/ArtistInterview';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function InterviewPage({ params }: any) {
  const { id } = await params;
  const trackId = String(id);
  const track = await getTrackId(trackId);
  const artistId = track.artists[0]?.id;

  if (!artistId) {
    return <div className="text-center mt-10">아티스트 정보를 찾을 수 없습니다.</div>;
  }

  const artist = await getArtist(artistId);

  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex mt-[188px] gap-4 h-[617px] w-[1043px] mx-auto">
        <div className="flex flex-col gap-10 w-full">
          <ArtistProfile artist={artist} />
          <ArtistInterview artist={artist} />
        </div>
      </main>
    </div>
  );
}
