'use client'
import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/dist/shared/lib/image-external";

import {formatDate} from "@/lib/utils/date";
import {CustomSearchResult} from "@/features/tracks/types/custom-search";

import ComplexLogo from '@/public/image/complex-logo.png'
import BillboardLogo from '@/public/image/billboard-logo.png';
import RollingStoneLogo from '@/public/image/rollingstone-logo.png';
import YoutubeLogo from '@/public/image/youtube-logo.png';


export default function ArtistInterviewComponent({artistInterview}: { artistInterview: CustomSearchResult | null }) {
  const [interviewPageLogo, setInterviewPageLogo] = useState<StaticImageData | null>(null);
  const [interviewPageName, setInterviewPageName] = useState<string | null>(null);

  const interviewLogo = artistInterview?.displayLink
const publishedTime = artistInterview?.pagemap?.metatags?.[0]?.['article:published_time'];

    useEffect(() => {
    if (interviewLogo === "www.rollingstone.com") {
      setInterviewPageLogo(RollingStoneLogo);
      setInterviewPageName("Rolling Stone");
    }
    if (interviewLogo === "www.billboard.com") {
      setInterviewPageLogo(BillboardLogo);
        setInterviewPageName("Billboard");
    }
    if (interviewLogo === "www.youtube.com") {
      setInterviewPageLogo(YoutubeLogo);
        setInterviewPageName("YouTube");
    }   
    if (interviewLogo === "www.complex.com") {
      setInterviewPageLogo(ComplexLogo);
        setInterviewPageName("Complex");
    }
  }, [interviewLogo]);

  return (
    <div className="flex items-center justify-center h-[150px] gap-4 mb-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center flex-col justify-center text-center gap-2 w-[90px] h-[90px]">
        <Image
          src={interviewPageLogo || '/default-logo.png'}
            alt="Artist Interview Logo"
            width={60}
            height={60}
            className="rounded-full object-cover"
        />
        <div>{interviewPageName}</div>
      </div>
      <div className="flex-1">{artistInterview?.snippet}</div>
      <div className="flex flex-col items-center">
        <Link href={artistInterview?.link || '#'} className="text-blue-500 hover:underline">인터뷰 전문 보기</Link>
        <div>
          {publishedTime ? (
            <span className="text-gray-500 text-sm">{formatDate(publishedTime)}</span>
          ) : (
            <span className="text-gray-500 text-sm">날짜 정보 없음</span>
          )}
        </div>
      </div>
    </div>
  );
}