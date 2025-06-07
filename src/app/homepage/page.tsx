import HeaderMain from "@/components/shared/HeaderMain";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="pt-300 flex flex-col items-center justify-center h-full gap-[1000px]">
        <section className="flex items-center justify-center">
          <header>Global Top 50</header>
        </section>
        <div className="flex items-center justify-between flex-col h-full">
          <section>
            현재 인기 차트 탑 5 카드로 애니메이션{" "}
            <Link href={"/charts"}>차트보러가기</Link>
          </section>
          <section>최신곡 1개 차트 보러가기</section>
          <section>추천음악</section>
          <section>
            <Link href={"/playlists"}>플레이리스트</Link>
          </section>
          <section className="text-center w-full mt-auto py-8">footer</section>
        </div>
      </main>
    </div>
  );
}
// "use client";
// import React, { use } from "react";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import clsx from "clsx";
// import HeaderSort from "../../../public/image/header-sort.png";

// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="w-full">
//       {/* Top Header - 스크롤 시 사라짐 */}
//       {!isScrolled && (
//         <div className="bg-white shadow px-4 py-2 transition-all duration-300">
//           <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div className="text-2xl font-bold">billboard</div>
//             <div className="space-x-4 text-sm">
//               <button>Login</button>
//               <button className="bg-blue-600 text-white px-2 py-1 rounded">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sticky Header - 스크롤해도 고정되며 스타일 변화 */}
//       <div
//         className={clsx(
//           "sticky top-0 z-50 transition-all duration-300",
//           isScrolled ? "bg-white shadow-md py-2" : "bg-black py-4 text-white"
//         )}
//       >
//         <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
//           <div className="text-xl font-bold">billboard</div>
//           <div className="space-x-6 text-sm">
//             <a href="#">CHARTS</a>
//             <a href="#">MUSIC</a>
//             <a href="#">VIDEO</a>
//             <a href="#">SHOP</a>
//             <a href="#">AWARDS</a>
//             <a href="#">BUSINESS</a>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// }
