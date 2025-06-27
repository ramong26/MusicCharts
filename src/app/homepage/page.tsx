import Image from "next/image";

import HeaderMain from "@/components/shared/HeaderMain";
import InterviewList from "@/features/homepage/components/InterviewList";
import ChartTop5 from "@/features/homepage/components/ChartTop5";
import MainVideo from "@/features/homepage/components/MainVideo";

import useTrackList from "@/components/hooks/useTrackList";

export default async function HomePage() {
  const tracksList = await useTrackList();

  return (
    <div className="h-screen ">
      <HeaderMain />
      <div>
        <div className="flex flex-col items-center justify-start h-full">
          <main className="flex mt-[168px]  gap-4 h-[617px]">
            <div className="flex items-center justify-center ">
              <header className="w-[627px] h-[618px]">
                <Image
                  src={tracksList[0]?.track.album.images[0].url}
                  alt="Album Cover"
                  width={627}
                  height={627}
                />
              </header>
            </div>
            <div className="flex items-center justify-between flex-col w-[400px] h-[600px]">
              <InterviewList />
            </div>
          </main>
          <div className="mx-auto mt-[50px]">
            <ChartTop5 tracksList={tracksList} />
          </div>
          <div className="w-full bg-[#000000] mt-10 h-100">
            <MainVideo />
          </div>
        </div>
      </div>
    </div>
  );
}
