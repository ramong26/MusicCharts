import Image from 'next/image';
import Link from 'next/link';

import { TrackItem } from '@/shared/types/spotifyTrack';

export default function ChartTop5({ tracksList }: { tracksList: TrackItem[] }) {
  if (!tracksList || tracksList.length === 0) return null;
  // console.log(tracksList);
  return (
    <section className="w-full mt-16">
      {/* 헤더 */}
      <div className="lg:text-3xl md:text-2xl text-lg font-extrabold md:px-[50px] px-[15px] h-[70px] flex items-center text-black  bg-[#FFD460] border-t-4 border-b-4 border-black justify-between shadow-[0_4px_0_#000] uppercase tracking-wide">
        <div>🔥 TOP 5 TRACKS</div>
        <Link
          href="/charts"
          className="lg:text-2xl md:text-xl text-md font-bold underline hover:text-[#D65361] transition-colors"
        >
          Go Charts →
        </Link>
      </div>

      {/* TOP 5 카드 */}
      <div className="flex md:h-[320px] h-fit md:px-6 px-2 md:pt-8 pt-4 md:pb-0 pb-4 w-full bg-[#fdfbf7] border-x-4 border-b-4 border-black">
        {tracksList.slice(0, 5).map((track, index) => (
          <Link key={track?.track?.id} href={`/tracks/${track?.track?.id}`} className="w-1/5">
            <div
              className={`md:px-3 px-2 flex flex-col items-center gap-4 cursor-pointer  hover:rotate-1 hover:-translate-y-2 transition-transform duration-300 ${
                index !== 4 ? 'border-r-2 border-dashed border-black/50' : ''
              }`}
            >
              <div className="relative">
                <Image
                  src={
                    track?.track?.album?.images?.[1]?.url || track?.track?.album?.images?.[0]?.url
                  }
                  alt={track?.track?.name}
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
                  {track?.track?.name}
                </div>
                <div className="lg:text-lg md:text-md text-xs md:max-w-[140px] max-w-[100px] text-gray-700 truncate  italic">
                  {track?.track?.artists?.map((artist) => artist.name).join(', ')}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
