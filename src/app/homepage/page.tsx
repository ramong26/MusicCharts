import Link from "next/link";

import HeaderMain from "@/components/shared/HeaderMain";
import useTrackList from "@/components/hooks/useTrackList";
import getTrackIdInterview from "@/features/tracks/hooks/getTrackIdInterview";
import InterviewList from "@/features/homepage/components/InterviewList";

export default async function HomePage() {
  const tracksList = await useTrackList();

  const generalQuery = `artist interview site:rollingstone.com OR site:billboard.com OR site:pitchfork.com OR site:complex.com`;
  const interviews = await getTrackIdInterview(generalQuery);

  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex items-start justify-center h-full mt-[168px] bg-[aliceblue] gap-4">
        <div className="flex items-center justify-center ">
          <header className="w-[470px] h-[470px]">
            <img
              src={tracksList[0]?.track.album.images[0].url}
              alt="Album Cover"
            />
          </header>
        </div>
        <div className="flex items-center justify-between flex-col w-[400px] h-[600px]">
          <InterviewList />
        </div>
      </main>
    </div>
  );
}
