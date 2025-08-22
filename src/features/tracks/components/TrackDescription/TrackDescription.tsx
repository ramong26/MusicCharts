import Image from 'next/image';

import fetchWikiInfo from '@/features/tracks/hooks/TrackDescription/fetchWikiInfo';
import type { Album } from '@/shared/types/spotifyTrack';

import TrackCommentsSkeleton from '@/features/tracks/components/TrackComments/TrackCommentsSkeleton';
import TrackPageShare from '@/features/tracks/components/TrackDescription/TrackPageShare';

export default async function TrackDescription({ album }: { album: Album }) {
  // 앨범 정보를 위키피디아를 통해 가져옴
  const summary = await fetchWikiInfo({ album });

  if (!album) {
    return <TrackCommentsSkeleton />;
  }
  return (
    <div>
      <div className="flex gap-10">
        <Image src={album.images[0].url} priority alt={album.name} width={400} height={400} />
        <div>
          <div className="flex gap-2 items-center">
            <div className="font-bold text-xl">{album.name}</div>
            <TrackPageShare />
            {/* <div className="cursor-pointer" onClick={handleCopyLink}>
              공유
            </div> */}
          </div>
          <div>{summary}</div>
        </div>
      </div>
    </div>
  );
}
