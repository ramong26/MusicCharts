'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import { TrackItem } from '@/shared/types/SpotifyTrack';
import { getTrackIdInterview } from '@/features/tracks/hooks/getTrackIdInterview';

interface PlaylistInterviewListProps {
  playlistId: string;
}

export default function PlaylistInterviewList({
  playlistId,
}: PlaylistInterviewListProps) {
  const queryClient = useQueryClient();
  const trackData = queryClient.getQueryData<TrackItem[]>([
    'track-list',
    playlistId,
  ]);

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

  const calledRef = useRef(false);

  // 각 아티스트별로 개별 검색
  useEffect(() => {
    if (!artists.length || calledRef.current) return;

    calledRef.current = true;

    artists.forEach(async (artist) => {
      const query = `${artist} artist interview site:rollingstone.com OR site:billboard.com OR site:pitchfork.com OR site:complex.com`;

      setLoadingArtists((prev) => new Set(prev).add(artist));

      try {
        const data = await getTrackIdInterview(query);
        const links = data.map((item) => item.link).slice(0, 5);

        setArtistInterviews((prev) => ({
          ...prev,
          [artist]: links,
        }));
      } catch (error) {
        console.error(`Error fetching interviews for ${artist}:`, error);
        setArtistInterviews((prev) => ({
          ...prev,
          [artist]: [],
        }));
      } finally {
        setLoadingArtists((prev) => {
          const newSet = new Set(prev);
          newSet.delete(artist);
          return newSet;
        });
      }
    });
  }, [artists]);

  if (!trackData) {
    return <p>트랙 데이터를 불러오는 중입니다...</p>;
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
