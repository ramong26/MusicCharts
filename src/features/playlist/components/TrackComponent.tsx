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
      <div
        key={index}
        className="flex items-center gap-4 mb-4 border-b-1 border-black pb-4 cursor-pointer hover:bg-gray-100 transition w-full h-[70px] animate-pulse"
      >
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] bg-gray-300 "></div>
        </div>
        <div className="flex flex-col overflow-hidden w-full">
          <div className="font-bold text-lg break-words w-full bg-gray-300 h-6"></div>
          <div className="max-w-md text-gray-600 break-words bg-gray-200 h-4 mt-2"></div>
        </div>
      </div>
    ));
  };

  // 실제 트랙 아이템 렌더링
  const renderTrackItems = () => {
    return tracksList?.map((item, index) => (
      <React.Fragment key={item.track.id}>
        {link ? (
          <Link href={`/tracks/${item.track.id}`}>
            <div className="flex items-center gap-4 mb-4 border-b-1 border-black pb-4 cursor-pointer hover:bg-gray-100 transition w-full h-[70px]">
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
    <div className={`relative border-3 border-black p-5 mt-10 bg-white w-full  ${className}`}>
      <span
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 
      border-2 border-black font-bold text-2xl whitespace-nowrap text-ellipsis"
      >
        {title}
      </span>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 mt-3">
        {isLoading ? renderSkeletonItems() : renderTrackItems()}
      </div>
    </div>
  );
}
