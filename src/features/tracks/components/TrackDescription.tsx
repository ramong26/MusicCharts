import { Album } from '@/shared/types/SpotifyTrack';
import Image from 'next/image';

export default function TrackDescription({ album }: { album: Album }) {
  console.log('Album:', album);
  return (
    <div>
      <div className="flex gap-10">
        <Image
          src={album.images[0].url}
          alt={album.name}
          width={400}
          height={400}
        />
        <div>
          <div className="flex gap-2 items-center">
            <div>앨범이름</div>
            <div className="flex items-center jutify-between">
              <div>공유</div>
              <div>카카오톡공유</div>
            </div>
          </div>
          <div>설명</div>
        </div>
      </div>
    </div>
  );
}
