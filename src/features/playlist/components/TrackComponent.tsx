import Image from 'next/image';
import { TrackItem } from '@/shared/types/SpotifyTrack';

interface TrackComponentProps {
  tracksList: TrackItem[];
  title: string;
  className?: string;
  page?: number;
  limit?: number;
}

export default function TrackComponent({
  tracksList,
  title,
  className = '',
  page = 0,
  limit = 10,
}: TrackComponentProps) {
  return (
    <div
      className={`relative border-3 border-black p-5 mt-10  bg-white w-full ${className}`}
    >
      <h2 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 border-2 border-black font-bold text-2xl">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 mt-3">
        {tracksList.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 mb-4 border-b-1 border-black pb-4 cursor-pointer hover:bg-gray-100 transition w-full"
          >
            <div className="flex items-center gap-4">
              <div className="font-bold text-xl w-[30px]">
                {page * limit + index + 1}
              </div>
              <Image
                src={item.track.album.images[0].url}
                alt={item.track.name}
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col overflow-hidden w-full">
              <div className="font-bold text-lg break-words w-full">
                {item.track.name}
              </div>
              <div className=" max-w-md text-gray-600 break-words">
                {item.track.artists.map((artist) => artist.name).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
