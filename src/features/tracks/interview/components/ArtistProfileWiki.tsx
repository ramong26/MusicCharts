import { getArtistInfo } from '@/shared/hooks/getArtistInfo';

export default async function ArtistProfileWiki({
  artistName,
}: {
  artistName: string;
}) {
  const data = await getArtistInfo(artistName);
  console.log('ArtistProfileWiki data:', data);
  if (!data) {
    return (
      <div className="text-center mt-10">아티스트 정보를 찾을 수 없습니다.</div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Artist Wiki</h2>
      <p className="text-lg">{data.artistName}</p>
    </div>
  );
}
