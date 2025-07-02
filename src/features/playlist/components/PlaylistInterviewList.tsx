'use client';

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import {TrackItem } from '@/shared/types/SpotifyTrack'
import getTrackIdInterview from "@/features/tracks/hooks/getTrackIdInterview";

interface PlaylistInterviewListProps {
  playlistId: string;
}

export default function PlaylistInterviewList({ playlistId }: PlaylistInterviewListProps) {
  const queryClient = useQueryClient();
  const trackData = queryClient.getQueryData<TrackItem[]>(["track-list", playlistId]);
  const [interviews, setInterviews] = useState<string[]>([]);

  const artistName = useMemo(() => {
    const artistNameSet = new Set<string>();
    if (trackData && Array.isArray(trackData)) {
      trackData.forEach((track) => {
        if (track.track && Array.isArray(track.track.artists)) {
          track.track.artists.forEach((artist: { name: string }) => {
            artistNameSet.add(artist.name);
          });
        }
      });
    }
    return Array.from(artistNameSet).join(", ");
  }, [trackData]);
  const LATEST_INTERVIEWS_QUERY = useMemo(() => {
    if (!artistName) return "";
    return `${artistName} artist interview site:rollingstone.com OR site:billboard.com OR site:pitchfork.com OR site:complex.com`;
  }, [artistName]);

  useEffect(() => {
    if (!LATEST_INTERVIEWS_QUERY) {
      console.error("아티스트 이름이 없습니다. 트랙 데이터를 확인하세요.");
      return;
    }

    getTrackIdInterview(LATEST_INTERVIEWS_QUERY)
      .then((interviewData) => {
        console.log("인터뷰 데이터가 성공적으로 로드되었습니다:", interviewData);
        const interviewLinks = interviewData.map((interview: { link: string }) => interview.link);
        setInterviews(interviewLinks);
      })
      .catch((error) => {
        console.error("인터뷰 데이터를 불러오는 중 오류 발생:", error);
      });
  }, [LATEST_INTERVIEWS_QUERY]);
  if (!trackData) {
    return <p>트랙 데이터를 불러오는 중입니다...</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">아티스트 인터뷰 검색</h3>
      <ul className="list-disc list-inside space-y-2">
        {interviews.map((link) => (
          <li key={link}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              인터뷰 바로가기
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
