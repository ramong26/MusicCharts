import Image from 'next/image';
import Link from 'next/link';

import { TrackItem } from '@/shared/types/spotifyTrack';

export default function ChartTop5({ tracksList }: { tracksList: TrackItem[] }) {
  return (
    <div className="w-full">
      <div className="font-bold h-[55px] flex items-center px-[50px] text-[#ffffff] text-3xl bg-[#000000] justify-between">
        <div>TOP 5</div>
        <Link href="/charts" className="text-[#ffffff]">
          <div className="cursor-pointer">Go Charts</div>
        </Link>
      </div>
      <div className="flex h-[270px] w-full px-[4px] pt-[15px] bg-[#D65361] border-2 border-[#D65361]">
        <div className="w-full flex">
          {tracksList.slice(0, 5).map((track, index) => (
            <Link key={track.track.id} href={`/tracks/${track.track.id}`} className="w-1/5">
              <div
                className={`flex flex-col items-center gap-[10px] cursor-pointer px-2 ${
                  index !== 4 ? 'border-r border-[#000000]' : ''
                }`}
              >
                <Image
                  src={track?.track.album.images[0].url}
                  alt={track?.track.name}
                  width={150}
                  height={150}
                  className="rounded-full hover:animate-[spin_4s_linear_infinite] hover:scale-110 transition-transform duration-300 ease-in-out"
                />
                <div className="flex flex-col items-center text-[#000000] gap-1">
                  <div className="bg-[#000000] rounded-full text-[#ffffff] h-[24px] w-[24px] flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="text-lg">{track?.track?.name}</div>
                  <div className="text-sm truncate max-w-[140px] text-center">
                    {track.track.artists.map((artist) => artist.name).join(', ')}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// import Image from 'next/image';
// import Link from 'next/link';

// import { TrackItem } from '@/shared/types/spotifyTrack';

// export default function ChartTop5({ tracksList }: { tracksList: TrackItem[] }) {
//   return (
//     <div className="w-full">
//       <div className="font-bold h-[55px] flex items-center px-[50px] text-[#ffffff] text-3xl bg-[#000000] justify-between">
//         <div>TOP 5</div>
//         <Link href="/charts" className="text-[#ffffff]">
//           <div className="cursor-pointer">Go Charts</div>
//         </Link>
//       </div>
//       <div className="flex h-[270px] w-full px-[4px] pt-[15px] bg-[#ffffff] border-2 border-[#D65361]">
//         <div className="w-full flex">
//           {tracksList.slice(0, 5).map((track, index) => (
//             <Link key={track.track.id} href={`/tracks/${track.track.id}`} className="w-1/5">
//               <div
//                 className={`flex flex-col items-center gap-[10px] cursor-pointer px-2 ${
//                   index !== 4 ? 'border-r border-[#000000]' : ''
//                 }`}
//               >
//                 <Image
//                   src={track?.track.album.images[0].url}
//                   alt={track?.track.name}
//                   width={150}
//                   height={150}
//                   className="rounded-full hover:animate-[spin_4s_linear_infinite] hover:scale-110 transition-transform duration-300 ease-in-out"
//                 />
//                 <div className="flex flex-col items-center text-[#000000] gap-1">
//                   <div className="bg-[#000000] rounded-full text-[#ffffff] h-[24px] w-[24px] flex items-center justify-center">
//                     {index + 1}
//                   </div>
//                   <div className="text-lg">{track?.track?.name}</div>
//                   <div className="text-sm truncate max-w-[140px] text-center">
//                     {track.track.artists.map((artist) => artist.name).join(', ')}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
