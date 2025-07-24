import { getArtistInfo } from '@/shared/hooks/getArtistInfo';

import WikiRow from '@/features/tracks/interview/components/WikiRow';

export default async function ArtistProfileWiki({ artistName }: { artistName: string }) {
  const data = await getArtistInfo(artistName);

  if (!data) {
    return <div className="text-center mt-10 text-gray-500">아티스트 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="w-full mx-auto mt-10 px-8 py-6 bg-neutral-50 font-serif text-gray-900 leading-relaxed tracking-wide shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-8 text-center border-b-4 border-gray-700 pb-3 tracking-wide select-none">
        Artist Wiki
      </h2>
      <table className="w-full table-auto border-collapse border border-gray-300 rounded-md">
        <tbody>
          <WikiRow label="본명" value={data.artistName} />
          <WikiRow label="생년월일" value={data.birthDate.time} />
          <WikiRow label="성별" value={data.gender} />
          <WikiRow label="국적" value={data.nationality} />
          <WikiRow label="장르" value={data.genres.join(', ')} />
          <WikiRow
            label="수상내역"
            value={
              data.awards.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {data.awards.map((award, idx) => (
                    <li key={idx}>{award}</li>
                  ))}
                </ul>
              ) : (
                '정보 없음'
              )
            }
          />
        </tbody>
      </table>
    </div>
  );
}
