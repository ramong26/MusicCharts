import Image from 'next/image';

import { TrackItem } from '@/shared/types/spotifyTrack';
import Link from 'next/link';
import React from 'react';

interface TrackComponentProps {
  tracksList?: TrackItem[];
  title: string;
  className?: string;
  page?: number;
  limit?: number;
  isLoading?: boolean;
  link?: boolean;
}

export default function TrackComponent({
  tracksList,
  title,
  className = 'h-[540px]',
  page = 0,
  limit = 10,
  isLoading = false,
  link,
}: TrackComponentProps) {
  // 스켈레톤
  const renderSkeletonItems = () => {
    return Array.from({ length: limit }).map((_, index) => (
      <>
        <div
          className={`md:px-3 px-2 flex flex-col items-center gap-4 cursor-pointer  hover:rotate-1 hover:-translate-y-2 transition-transform duration-300 ${
            (index + 1) % 5 !== 0 ? 'border-r-2 border-dashed border-black/50' : ''
          }`}
        >
          <div className="relative">
            <div className="md:w-[150px] w-[100px] md:h-[150px] h-[100px] rounded-lg border-4 border-black shadow-[5px_5px_0px_#D65361] hover:scale-105 transition-transform" />
            <div className="absolute -top-3 -left-3 bg-black text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shadow-[2px_2px_0px_#FFD460]"></div>
          </div>
          <div className="flex flex-col items-center text-black gap-1 text-center">
            <div className="md:text-base text-sm md:max-w-[140px] max-w-[100px] font-bold truncate uppercase"></div>
            <div className="lg:text-lg md:text-md text-xs md:max-w-[140px] max-w-[100px] text-gray-700 truncate  italic"></div>
          </div>
        </div>
      </>
    ));
  };

  // 실제 트랙 아이템 렌더링
  const renderTrackItems = () => {
    return tracksList?.map((item, index) => (
      <React.Fragment key={item.track.id}>
        {link ? (
          <Link href={`/tracks/${item.track.id}`}>
            <div
              className={`md:px-3 px-2 flex flex-col items-center gap-4 cursor-pointer  hover:rotate-1 hover:-translate-y-2 transition-transform duration-300 ${
                (index + 1) % 5 !== 0 ? 'border-r-2 border-dashed border-black/50' : ''
              }`}
            >
              <div className="relative">
                <Image
                  src={item.track.album.images[0].url}
                  alt={item.track.name}
                  width={150}
                  height={150}
                  className="md:w-[150px] w-[100px] md:h-[150px] h-[100px] rounded-lg border-4 border-black shadow-[5px_5px_0px_#D65361] hover:scale-105 transition-transform"
                />
                <div className="absolute -top-3 -left-3 bg-black text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shadow-[2px_2px_0px_#FFD460]">
                  {index + 1}
                </div>
              </div>
              <div className="flex flex-col items-center text-black gap-1 text-center">
                <div className="md:text-base text-sm md:max-w-[140px] max-w-[100px] font-bold truncate uppercase">
                  {item.track.name}
                </div>
                <div className="lg:text-lg md:text-md text-xs md:max-w-[140px] max-w-[100px] text-gray-700 truncate  italic">
                  {item.track.artists.map((artist) => artist.name).join(', ')}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4 mb-4 border-b-1 border-black pb-4  transition w-full h-[70px]">
            <div className="flex items-center gap-4">
              <div className="font-bold text-xl w-[30px]">{page * limit + index + 1}</div>
              <Image
                src={item.track.album.images[0].url}
                alt={item.track.name}
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col overflow-hidden w-full">
              <div className="font-bold text-lg break-words w-full whitespace-nowrap text-ellipsis">
                {item.track.name}
              </div>
              <div className="max-w-md text-gray-600 break-words">
                {item.track.artists.map((artist) => artist.name).join(', ')}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div
      className={`relative border-2 border-black p-6 mt-12 bg-white rounded-xl shadow-md ${className}`}
    >
      <span
        className="absolute -top-5 left-1/2 -translate-x-1/2 
    bg-black text-white px-5 py-1 rounded-md border-2 border-black 
    font-bold text-xl"
      >
        {title}
      </span>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {isLoading ? renderSkeletonItems() : renderTrackItems()}
      </div>
    </div>
  );
}
