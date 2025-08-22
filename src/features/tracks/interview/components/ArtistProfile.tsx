import Image from 'next/image';

import ArtistProfileWiki from '@/features/tracks/interview/components/ArtistProfileWiki';
import type { Artist } from '@/shared/types/spotifyTrack';

export default function ArtistProfile({ artist }: { artist: Artist | null }) {
  const artistName = artist?.name;

  return (
    <div className="flex min-w-[1043px] flex-col items-center justify-center bg-[#f5f4f3] p-8 rounded-lg shadow-md font-serif text-gray-900 select-none">
      <div className="flex flex-col items-center mb-6">
        <div className="overflow-hidden shadow-lg border-4 border-[#E0DCCF] mb-4 w-[300px] h-[300px]">
          <Image
            src={artist?.images?.length ? artist.images[0]?.url : '/default-profile.png'}
            alt={artist?.name || 'Artist Profile'}
            width={300}
            height={300}
            priority
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl font-semibold border-b-4 border-gray-700 pb-3 w-full text-center tracking-wide">
          {artist?.name || 'Unknown Artist'}
        </h1>
      </div>

      <ArtistProfileWiki artistName={artistName} />
    </div>
  );
}
