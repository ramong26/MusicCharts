import Image from 'next/image';
import Link from 'next/link';

import { TrackItem } from '@/shared/types/spotifyTrack';

export default function ChartTop5({ tracksList }: { tracksList: TrackItem[] }) {
  return (
    <section className="w-full mt-16">
      {/* 헤더 */}
      <div className="font-extrabold h-[70px] flex items-center px-[50px] text-black text-3xl bg-[#FFD460] border-t-4 border-b-4 border-black justify-between shadow-[0_4px_0_#000] uppercase tracking-wide">
        <div>🔥 TOP 5 TRACKS</div>
        <Link
          href="/charts"
          className="text-base font-bold underline hover:text-[#D65361] transition-colors"
        >
          Go Charts →
        </Link>
      </div>

      {/* TOP 5 카드 */}
      <div className="flex h-[320px] w-full px-6 pt-8 bg-[#fdfbf7] border-x-4 border-b-4 border-black">
        {tracksList.slice(0, 5).map((track, index) => (
          <Link key={track.track.id} href={`/tracks/${track.track.id}`} className="w-1/5">
            <div
              className={`flex flex-col items-center gap-4 cursor-pointer px-3 hover:rotate-1 hover:-translate-y-2 transition-transform duration-300 ${
                index !== 4 ? 'border-r-2 border-dashed border-black/50' : ''
              }`}
            >
              <div className="relative">
                <Image
                  src={track.track.album.images[0].url}
                  alt={track.track.name}
                  width={150}
                  height={150}
                  className="rounded-lg border-4 border-black shadow-[5px_5px_0px_#D65361] hover:scale-105 transition-transform"
                />
                <div className="absolute -top-3 -left-3 bg-black text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shadow-[2px_2px_0px_#FFD460]">
                  {index + 1}
                </div>
              </div>
              <div className="flex flex-col items-center text-black gap-1 text-center">
                <div className="text-base font-bold truncate max-w-[140px] uppercase">
                  {track.track.name}
                </div>
                <div className="text-xs text-gray-700 truncate max-w-[140px] italic">
                  {track.track.artists.map((artist) => artist.name).join(', ')}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
