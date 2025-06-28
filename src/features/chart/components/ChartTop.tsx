import Miniplayer from "@/features/chart/components/Miniplayer";
import { getYoutubeTrackIdVideo } from "@/features/tracks/hooks/getYoutube";

export default async function ChartTop({
  topArtist,
  topTrack,
}: {
  topArtist: string;
  topTrack: string;
}) {
  const musicVideo = await getYoutubeTrackIdVideo(
    `${topArtist} ${topTrack} official music video`
  );

  if (!musicVideo || musicVideo.length === 0) {
    return <div>뮤직비디오를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="relative border-2 border-black p-10 mt-10 max-w-7xl mx-auto bg-white">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black  text-white px-6 py-2 border-2 border-black font-bold text-6xl">
        Top 1
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-10">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${musicVideo[0].id.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Miniplayer />
        <div className="flex justify-between items-center w-full">
          <div className="h-[400px] w-[400px]">아티스트커버</div>
          <div>맵을 통한 3개 인터뷰</div>
        </div>
      </div>
    </div>
  );
}
