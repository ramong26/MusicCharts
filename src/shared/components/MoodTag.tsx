import Image, { StaticImageData } from 'next/image';
import React from 'react';

import Chill from '@/public/image/chill-tag.jpg';
import HipHop from '@/public/image/hiphop-tag.jpg';
import Jazz from '@/public/image/jazz-tag.jpg';
import Pop from '@/public/image/pop-tag.jpg';
import KPop from '@/public/image/kpop-tag.jpeg';
import Rock from '@/public/image/rock-tag.jpg';
import Classical from '@/public/image/classical-tag.jpg';

interface MoodTagProps {
  tag: string;
}

export default function MoodTag({ tag }: MoodTagProps) {
  const tagImages: Record<string, StaticImageData> = {
    Chill,
    HipHop,
    Jazz,
    Pop,
    'K-Pop': KPop,
    Rock,
    Classical,
  };
  return (
    <div className="flex items-center justify-center flex-col w-fit h-fit cursor-pointer">
      <div className="pt-4 border-t-2 border-gray-dark hover:border-[#cccccc] transition-colors group">
        <div className="group w-[300px] h-[150px]  bg-beige-light hover:bg-beige-medium transition-colors rounded">
          <Image
            src={tagImages[tag]}
            alt={tag}
            width={300}
            height={150}
            priority
            className="w-full h-full object-cover rounded"
          />
        </div>
        <span className="text-lg font-semibold w-full h-full inline-flex items-center justify-center text-center">
          {tag}
        </span>
      </div>
    </div>
  );
}
