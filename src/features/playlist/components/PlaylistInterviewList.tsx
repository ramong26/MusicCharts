'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { TrackItem } from '@/shared/types/SpotifyTrack';
import { getCombinedInterviews } from '@/shared/hooks/searchInterviews';
import { CustomSearchResult } from '@/features/tracks/types/custom-search';

interface PlaylistInterviewListProps {
  trackData?: TrackItem[];
}

type ArtistInterviewMap = Record<string, CustomSearchResult[] | null>;

export default function PlaylistInterviewList({ trackData }: PlaylistInterviewListProps) {
  const [artistInterviews, setArtistInterviews] = useState<ArtistInterviewMap>({});
  const [visibleChunks, setVisibleChunks] = useState(1);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const chunkSize = 5;

  const observerRef = useRef(null);

  // 아티스트 이름을 추출하여 정렬된 배열로 반환, 중복 제거
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

  // 무한스크롤링을 위한 Intersection Observer 설정
  useEffect(() => {
    if (!trackData || trackData.length === 0) return;
    if (isScrollLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsScrollLoading(true);
            setVisibleChunks((prev) => prev + 1);
          }
        });
      },
      { root: null, threshold: 0.5, rootMargin: '0px' }
    );
    const target = observerRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [trackData]);

  // 청크 단위로 아티스트 인터뷰 검색 결과를 가져오는 함수
  const chunkArray = (artistsArr: string[], chunkSize: number): string[][] => {
    const chunks: string[][] = [];
    for (let i = 0; i < artistsArr.length; i += chunkSize) {
      chunks.push(artistsArr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // 아티스트별 인터뷰 검색 결과를 가져오는 useEffect
  useEffect(() => {
    if (!artists.length) return;

    const fetchChunkedInterviews = async () => {
      const chunked = chunkArray(artists, chunkSize);
      const currentChunk = chunked[visibleChunks - 1];
      if (!currentChunk) return;

      const newInterviews: ArtistInterviewMap = {};
      await Promise.all(
        currentChunk.map(async (artist) => {
          if (!artistInterviews[artist]) {
            const result = await getCombinedInterviews(artist);
            newInterviews[artist] = result.results;
          }
        })
      );

      setArtistInterviews((prev) => ({ ...prev, ...newInterviews }));
      setIsScrollLoading(false);
    };
    fetchChunkedInterviews();
  }, [visibleChunks, artists]);

  if (!trackData || trackData.length === 0) {
    return <p>트랙 데이터를 불러오는 중이거나 없습니다.</p>;
  }

  return (
    <div className="relative  border-3 border-t-black border-l-black border-r-black pt-5 pl-5 pr-5 mt-10 bg-white w-full ">
      <h3 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 border-2 border-black font-bold text-2xl whitespace-nowrap">
        아티스트 인터뷰 검색 결과
      </h3>
      <div className="space-y-6 mt-10 ">
        {artists.slice(0, visibleChunks * chunkSize).map((artist) => (
          <div key={artist} className="flex flex-col border-b border-black pb-4 last:border-none">
            <h4 className="text-xl font-semibold mb-3 text-gray-900">{artist}</h4>
            <ul className="text-gray-700 text-sm space-y-1">
              {artistInterviews[artist] === undefined ? (
                <li className="text-gray-400 italic animate-pulse">로딩 중...</li>
              ) : artistInterviews[artist] && artistInterviews[artist]!.length > 0 ? (
                artistInterviews[artist]!.slice(0, 5).map((result, i) => (
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
        {isScrollLoading && <div className="text-center text-gray-500">로딩 중...</div>}
        {visibleChunks * chunkSize < artists.length && <div ref={observerRef} className="h-10" />}
      </div>
    </div>
  );
}
