import Image from 'next/image';

import HowPlaylist1 from '@/public/image/how-playlist1.png';
import HowPlaylist2 from '@/public/image/how-playlist2.png';
import HowMan from '@/public/image/man-playlist.png';

export default function HowPlaylist() {
  return (
    <div className="relative border-3 border-black p-10 mt-10 max-w-7xl mx-auto bg-white w-full">
      <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black  text-white px-6 py-2 border-2 border-black font-bold text-xl">
        How to use Playlist
      </h1>
      <div className="flex flex-row justify-between items-center h-full">
        <div className="flex flex-col h-full items-center justify-between ">
          <span className="block mb-2 text-xl font-semibold">1단계. 🔓 공개 상태인지 확인!</span>
          <div className="w-[430px] h-[380px] relative">
            <Image
              src={HowPlaylist1}
              alt="공개 플레이리스트 확인"
              width={430}
              height={380}
              className=" absolute w-full h-full"
              priority
            />
          </div>
          <p className="mt-2 text-md text-gray-600">졸라맨도 공개 안 하면 못 봐요...! 😢</p>
        </div>
        <div className="h-full flex items-end justify-center pb-4">
          <Image
            src={HowMan}
            alt="졸라맨 플레이리스트"
            width={100}
            height={150}
            className="h-[150px]"
            priority
          />
        </div>

        <div className="flex flex-col items-center justify-between ">
          <span className="block mb-2 text-xl font-semibold">2단계. 🔗 링크 복사해서 제출!</span>
          <div className="w-[430px] h-[380px] relative">
            <Image
              src={HowPlaylist2}
              alt="플레이리스트 링크 복사"
              width={430}
              height={380}
              className=" absolute w-full h-full"
              priority
            />
          </div>
          <p className="mt-2 text-md text-gray-600">
            📎참고 : 스포티파이 공식 플레이리스트는 되지 않아요!
          </p>
        </div>
      </div>
    </div>
  );
}
