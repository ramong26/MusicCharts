'use client';
import { useState, useEffect, useMemo, useRef } from 'react';

import type { TrackItem } from '@/shared/types/spotifyTrack';
import { CustomSearchResult } from '@/features/tracks/types/custom-search';
import { getCombinedInterviews } from '@/shared/hooks/searchInterviews';

interface PlaylistInterviewListProps {
  trackData?: TrackItem[];
}

type ArtistInterviewMap = Record<string, CustomSearchResult[] | null>;

export function useFetchArtistInterviews(props: PlaylistInterviewListProps) {
  const { trackData } = props;
  const [artistInterviews, setArtistInterviews] = useState<ArtistInterviewMap>({});
  const [visibleChunks, setVisibleChunks] = useState(1);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const chunkSize = 5;

  const observerRef = useRef(null);
  const isScrollLoadingRef = useRef(false);
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
          if (entry.isIntersecting && !isScrollLoadingRef.current) {
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
  }, [trackData, isScrollLoading]);

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
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      const chunked = chunkArray(artists, chunkSize);
      const currentChunk = chunked[visibleChunks - 1];
      if (!currentChunk) return;

      const newInterviews: ArtistInterviewMap = {};
      const results = await Promise.allSettled(
        currentChunk.map(async (artist) => {
          if (!artistInterviews[artist]) {
            const result = await getCombinedInterviews(artist);
            newInterviews[artist] = result.results;
          }
        })
      );

      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(
            `Failed to fetch interviews for artist: ${currentChunk[index]}`,
            result.reason
          );
        }
      });

      setArtistInterviews((prev) => ({ ...prev, ...newInterviews }));

      await delay(500);
      setIsScrollLoading(false);
      isScrollLoadingRef.current = false;
    };
    fetchChunkedInterviews();
  }, [visibleChunks, artists, artistInterviews]);

  return {
    artistInterviews,
    observerRef,
    isScrollLoading,
    setIsScrollLoading,
    visibleChunks,
    setVisibleChunks,
    artists,
    chunkSize,
  };
}
