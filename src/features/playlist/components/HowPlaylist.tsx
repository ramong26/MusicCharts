import Image from 'next/image';

import HowPlaylist1 from '@/public/image/how-playlist1.png';
import HowPlaylist2 from '@/public/image/how-playlist2.png';

export default function HowPlaylist() {
  return (
    <>
      <section className=" lg:mt-24 md:mt-16 mt-12 lg:gap-12 gap-8 lg:mx-auto mx-4 w-[1286px] lg:p-8 md:p-6 p-4 flex  flex-col items-center justify-between bg-[#fdfbf7] border-4 border-black shadow-[6px_6px_0px_#000] ">
        <h1 className="lg:text-[56px] text-[40px] font-extrabold leading-tight text-black uppercase tracking-wide drop-shadow-[3px_3px_0px_#FFD460]">
          How to Submit Playlist
        </h1>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 text-lg md:text-xl font-bold  flex items-center gap-2">
              <span className="text-2xl">①</span> 공개 상태 확인
            </span>
            <div className="relative w-[600px] h-[220px] md:h-[300px] border-4 border-black bg-white rounded-xl overflow-hidden shadow-[4px_4px_0px_black]">
              <Image
                src={HowPlaylist1}
                alt="공개 플레이리스트 확인"
                fill
                className="object-contain p-3"
                priority
              />
            </div>
            <p className="mt-4 text-sm md:text-base font-semibold ">
              <> 플레이리스트를 공개 상태로 두어야 제출 가능!</>
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 text-lg md:text-xl font-bold  flex items-center gap-2">
              <span className="text-2xl">②</span> 링크 복사 & 제출
            </span>
            <div className="relative w-[600px] h-[220px] md:h-[300px] border-4 border-black bg-white rounded-xl overflow-hidden shadow-[4px_4px_0px_black]">
              <Image
                src={HowPlaylist2}
                alt="플레이리스트 링크 복사"
                fill
                className="object-contain p-3"
                priority
              />
            </div>

            <p className="mt-4 text-sm md:text-base font-semibold ">
              <>공식 스포티파이 플레이리스트는 제출 불가!!🙅</>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// <section className="bg-gradient-to-b from-[#EC003F] to-[#FF2056] border-4 border-black p-10 md:p-16 mt-12 max-w-6xl mx-auto w-full shadow-[6px_6px_0px_black] rounded-2xl">
//         {/* 제목 */}
//         <h2
//           className="lg:text-4xl md:text-2xl text-xl font-extrabold text-white flex items-center justify-center mb-10"
//           style={{
//             textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000',
//           }}
//         >
//           How to Submit Playlist
//         </h2>

//         <div className="grid md:grid-cols-2 gap-12 items-start  text-white">
//           {/*  1 단계 */}
//           <div className="flex flex-col items-center text-center">
//             <span className="mb-4 text-lg md:text-xl font-bold  flex items-center gap-2">
//               <span className="text-2xl">①</span> 공개 상태 확인
//             </span>
//             <div className="relative w-full h-[220px] md:h-[280px] border-4 border-black bg-white rounded-xl overflow-hidden shadow-[4px_4px_0px_black]">
//               <Image
//                 src={HowPlaylist1}
//                 alt="공개 플레이리스트 확인"
//                 fill
//                 className="object-contain p-3"
//                 priority
//               />
//             </div>
//             <p className="mt-4 text-sm md:text-base font-semibold ">
//               <> 플레이리스트를 공개 상태로 두어야 제출 가능!</>
//             </p>
//           </div>

//           {/*  2 단계 */}
//           <div className="flex flex-col items-center text-center">
//             <span className="mb-4 text-lg md:text-xl font-bold  flex items-center gap-2">
//               <span className="text-2xl">②</span> 링크 복사 & 제출
//             </span>
//             <div className="relative w-full h-[220px] md:h-[280px] border-4 border-black bg-white rounded-xl overflow-hidden shadow-[4px_4px_0px_black]">
//               <Image
//                 src={HowPlaylist2}
//                 alt="플레이리스트 링크 복사"
//                 fill
//                 className="object-contain p-3"
//                 priority
//               />
//             </div>

//             <p className="mt-4 text-sm md:text-base font-semibold ">
//               <>공식 스포티파이 플레이리스트는 제출 불가!!🙅</>
//             </p>
//           </div>
//         </div>
//       </section>
