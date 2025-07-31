import Image from 'next/image';
import { TrackItem } from '@/shared/types/SpotifyTrack';

interface RecommendCardProps {
  track: TrackItem;
}

export default function RecommendCard({ track }: RecommendCardProps) {
  console.log('Track in RecommendCard:', track);
  const actualTrack = track.track;
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <Image
        src={actualTrack?.album?.images[0]?.url}
        alt={actualTrack?.name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{actualTrack?.name}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
          {actualTrack?.artists[0]?.name}
        </p>
      </div>
    </div>
  );
}
