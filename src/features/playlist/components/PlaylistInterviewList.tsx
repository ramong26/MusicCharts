'use client';

import { useEffect, useMemo, useState } from 'react';

import { TrackItem } from '@/shared/types/SpotifyTrack';
import { searchInterviews } from '@/features/tracks/hooks/searchInterviews';

interface PlaylistInterviewListProps {
  trackData?: TrackItem[];
}

export default function PlaylistInterviewList({
  trackData,
}: PlaylistInterviewListProps) {
  const [artistInterviews, setArtistInterviews] = useState<
    Record<string, string[]>
  >({});

  const [loadingArtists, setLoadingArtists] = useState<Set<string>>(new Set());

  // 중복 아티스트 이름 제거하고 배열로 반환 useMemo로 데이터 재계산 최적화
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

  // 각 아티스트별로 개별 검색
  useEffect(() => {
    if (!artists.length) return;

    const fetchAll = async () => {
      const newResults: Record<string, string[]> = {};
      const nextLoading = new Set(artists);

      setLoadingArtists(nextLoading);

      const interviewPromises = artists.map((artist) => {
        return searchInterviews(
          `${artist} artist interview site:rollingstone.com OR site:billboard.com OR site:pitchfork.com OR site:complex.com`
        )
          .then((res) => ({
            artist,
            links: res.map((r) => r.link).slice(0, 5),
          }))
          .catch((error) => {
            console.error(`인터뷰 fetch 실패: ${artist}`, error);
            return { artist, links: [] };
          });
      });

      const results = await Promise.allSettled(interviewPromises);

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const { artist, links } = result.value;
          newResults[artist] = links;
        }
      });

      setArtistInterviews((prev) => ({ ...prev, ...newResults }));
      setLoadingArtists(new Set());
    };

    fetchAll();
  }, [artists]);

  if (!trackData || trackData.length === 0) {
    return <p>트랙 데이터를 불러오는 중이거나 없습니다.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">아티스트 인터뷰 검색</h3>
      <div className="space-y-6">
        {artists.map((artist) => (
          <div key={artist} className="border-b pb-4">
            <h4 className="text-lg font-semibold mb-3">{artist}</h4>
            {loadingArtists.has(artist) ? (
              <p className="text-gray-500">인터뷰를 검색 중입니다...</p>
            ) : (
              <ul className="list-disc list-inside space-y-2 ml-4">
                {artistInterviews[artist]?.length === 0 && (
                  <li className="text-gray-500">관련 인터뷰가 없습니다.</li>
                )}
                {artistInterviews[artist]?.map((link, index) => (
                  <li key={link}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      인터뷰 {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
