import HeaderMain from "@/components/shared/HeaderMain";
import Link from "next/link";
import useTrackList from "@/components/hooks/useTrackList";

export default async function HomePage() {
  const tracksList = await useTrackList();

  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex items-start justify-center h-full mt-[168px]">
        <div className="flex items-center justify-center">
          <header className="w-[470px] h-[470px]">
            <img
              src={tracksList[0]?.track.album.images[0].url}
              alt="Album Cover"
            />
          </header>
        </div>
        <div className="flex items-center justify-between flex-col h-full w-[400px]">
          latest news
        </div>
      </main>
    </div>
  );
}
