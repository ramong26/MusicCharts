import { useEffect, useState } from 'react';

import RecommendCard from '@/features/foryou/components/RecommendCard';
import { getTrackList } from '@/shared/hooks/getTrackList';
import { TrackItem } from '@/shared/types/SpotifyTrack';
interface MoodTagProps {
  tag: string;
}

export default function RecommendList({ tag }: MoodTagProps) {
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const moodTagMap: Record<string, string> = {
    Chill: '5oInhZHEhRY0APnViqHEfn',
    HipHop: '5oInhZHEhRY0APnViqHEfn',
    Jazz: '5oInhZHEhRY0APnViqHEfn',
    Pop: '5oInhZHEhRY0APnViqHEfn',
    KPop: '5oInhZHEhRY0APnViqHEfn',
    Rock: '5oInhZHEhRY0APnViqHEfn',
    Classical: '5oInhZHEhRY0APnViqHEfn',
  };
  useEffect(() => {
    const playlistId = moodTagMap[tag];
    if (!playlistId) return;

    const fetchTracks = async () => {
      const res = await getTrackList({ playlistId });
      console.log('Fetched tracks:', res);
      setTracks(res);
    };

    fetchTracks();
  }, [tag]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Recommended for You</h2>
      <p className="text-gray-600">Explore tracks based on your listening habits.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {tracks.map((track, index) => (
          <RecommendCard key={index} track={track} />
        ))}
      </div>
    </div>
  );
}
