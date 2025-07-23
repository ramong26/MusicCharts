import Image from 'next/image';

import ArtistProfileWiki from '@/features/tracks/interview/components/ArtistProfileWiki';

import { Artist } from '@/shared/types/SpotifyTrack';

export default function ArtistProfile({ artist }: { artist: Artist | null }) {
  const artistName = artist?.name || 'Unknown Artist';
  return (
    <div className="flex flex-row items-center justify-center ">
      <div>
        <Image
          src={
            artist?.images?.length
              ? artist.images[0]?.url
              : '/default-profile.png'
          }
          alt={artist?.name || 'Artist Profile'}
          width={150}
          height={150}
          className="rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold mb-4">{artist?.name}</h1>
      </div>
      <ArtistProfileWiki artistName={artistName} />
    </div>
  );
}
