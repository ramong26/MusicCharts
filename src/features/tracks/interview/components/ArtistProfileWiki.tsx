'use client';
import { useQuery } from '@tanstack/react-query';

import { ArtistWiki } from '@/features/tracks/types/WikiArtist';
import getArtistInfo from '@/shared/hooks/getArtistInfo';
import WikiRow from '@/features/tracks/interview/components/WikiRow';

interface Props {
  artistId?: string;
  artistName?: string;
}

export default function ArtistProfileWiki({ artistName }: Props) {
  const {
    data: artistInfo,
    isLoading,
    error,
  } = useQuery<ArtistWiki>({
    queryKey: ['artistInfo', artistName],
    queryFn: () => getArtistInfo(artistName!),
    enabled: !!artistName,
  });

  return (
    <div className="w-full mx-auto mt-10 px-8 py-6 bg-neutral-50 font-serif text-gray-900 leading-relaxed tracking-wide shadow-md rounded-md min-h-[300px]">
      <h2 className="text-3xl font-bold mb-8 text-center border-b-4 border-gray-700 pb-3 tracking-wide select-none">
        Artist Wiki
      </h2>

      {error && (
        <div className="text-center text-red-500">아티스트 정보를 불러오는 데 실패했습니다.</div>
      )}
      <div className="min-h-[1000px]">
        {(isLoading || artistInfo) && (
          <table className="w-full table-auto border-collapse border border-gray-300 rounded-md">
            <tbody>
              <WikiRow label="본명" value={artistInfo?.artistName} isLoading={isLoading} />
              <WikiRow label="생년월일" value={artistInfo?.birthDate?.time} isLoading={isLoading} />
              <WikiRow label="성별" value={artistInfo?.gender} isLoading={isLoading} />
              <WikiRow label="국적" value={artistInfo?.nationality} isLoading={isLoading} />
              <WikiRow label="장르" value={artistInfo?.genres?.join(', ')} isLoading={isLoading} />
              <WikiRow
                label="수상내역"
                value={
                  artistInfo?.awards && artistInfo.awards.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {artistInfo.awards.map((award, idx) => (
                        <li key={idx}>{award}</li>
                      ))}
                    </ul>
                  ) : (
                    '정보 없음'
                  )
                }
                isLoading={isLoading}
              />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
