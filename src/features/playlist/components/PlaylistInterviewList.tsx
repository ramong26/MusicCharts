'use client';

import { useEffect, useMemo, useState } from 'react';

import { TrackItem } from '@/shared/types/SpotifyTrack';
import { searchInterviews } from '@/features/tracks/hooks/searchInterviews';

interface PlaylistInterviewListProps {
  trackData?: TrackItem[];
}
type SearchResult = Awaited<ReturnType<typeof searchInterviews>>;
type ArtistInterviewMap = Record<string, SearchResult>;
export default function PlaylistInterviewList({
  trackData,
}: PlaylistInterviewListProps) {
  const [artistInterviews, setArtistInterviews] = useState<ArtistInterviewMap>(
    {}
  );

  // 중복 아티스트 이름 제거 후 정렬
  const artists = useMemo(() => {
    const set = new Set<string>();
    trackData?.forEach((track) => {
      const firstArtist = track.track?.artists?.[0];
      if (firstArtist) {
        set.add(firstArtist.name);
      }
    });
    return Array.from(set).sort();
  }, [trackData]);

  // 아티스트 인터뷰 검색
  useEffect(() => {
    if (!artists.length) return;

    const fetchAll = async () => {
      const interviewPromises = artists.map((artist) =>
        searchInterviews(
          `${artist} artist interview site:rollingstone.com OR site:billboard.com OR site:pitchfork.com OR site:complex.com`
        )
      );

      const settledResults = await Promise.allSettled(interviewPromises);

      const map: Record<string, SearchResult> = {};

      settledResults.forEach((result, idx) => {
        const artist = artists[idx];
        if (result.status === 'fulfilled') {
          map[artist] = result.value;
        } else {
          map[artist] = [];
          console.warn(`인터뷰 검색 실패: ${artist}`, result.reason);
        }
      });

      setArtistInterviews(map);
    };

    fetchAll();
  }, [artists]);

  if (!trackData || trackData.length === 0) {
    return <p>트랙 데이터를 불러오는 중이거나 없습니다.</p>;
  }

  return (
    <div className="relative border-3 border-black p-5 mt-10 bg-white w-full ">
      <h3 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 border-2 border-black font-bold text-2xl whitespace-nowrap">
        아티스트 인터뷰 검색 결과
      </h3>

      <div className="space-y-6 mt-10">
        {artists.map((artist) => (
          <div
            key={artist}
            className="flex flex-col border-b border-black pb-4 last:border-none "
          >
            <h4 className="text-xl font-semibold mb-3 text-gray-900">
              {artist}
            </h4>
            <ul className="text-gray-700 text-sm space-y-1 ">
              {artistInterviews[artist] === undefined ? (
                <li className="text-gray-400 italic animate-pulse">
                  로딩 중...
                </li>
              ) : artistInterviews[artist].length > 0 ? (
                artistInterviews[artist].slice(0, 5).map((result, i) => (
                  <li key={i}>
                    <a
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:bg-gray-100 transition"
                    >
                      {result.title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">검색 결과 없음</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
