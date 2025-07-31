import { useEffect, useState } from 'react';

import RecommendCard from '@/features/recommend/components/RecommendCard';
import { getTrackList } from '@/shared/hooks/getTrackList';
import { TrackItem } from '@/shared/types/SpotifyTrack';
interface MoodTagProps {
  tag: string;
}

export default function RecommendList({ tag }: MoodTagProps) {
  const [tracks, setTracks] = useState<TrackItem[]>([]);

  // 각 태그에 맞는 플레이리스트 ID 매핑
  const moodTagMap: Record<string, string> = {
    Chill: '3vz8DopD29nRgCho92VKfa',
    HipHop: '2hHkPUMH6Ul5AUyXSaltcM',
    Jazz: '4ciHL9ecTiieBxjf8YIaaR',
    Pop: '7lkbq5hls1txKUUGb7Fu6m',
    KPop: '59A5G8RRyG1tjND3x3zsyW',
    Rock: '6kVEeyek3h3P1eZZMxRQgD',
    Classical: '3INeJ9z2wVrhyz49e9Ximl',
  };

  // 플레이리스트 ID에 따라 트랙 리스트를 가져오는 함수
  useEffect(() => {
    const playlistId = moodTagMap[tag];
    if (!playlistId) return;

    const fetchTracks = async () => {
      const res = await getTrackList({ playlistId });

      setTracks(res);
    };

    fetchTracks();
  }, [tag]);

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="text-2xl font-bold">
        <span>Recommended for You</span>
        <span>{tag}</span>
      </div>
      <p className="text-gray-600">Explore tracks based on your listening habits.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map((track, index) => (
          <RecommendCard key={index} track={track} />
        ))}
      </div>
    </div>
  );
}
