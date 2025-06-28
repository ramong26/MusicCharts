import HeaderMain from "@/components/shared/HeaderMain";
import ChartTop from "@/features/chart/components/ChartTop";
import ChartComponent from "@/features/chart/components/ChartComponent";

import useTrackList from "@/components/hooks/useTrackList";
// import getTopTrackPlaylist from "@/features/chart/hooks/getTopTrackPlaylist";

export default async function Charts() {
  const playlistId = "2fmFoUa7WNxIfvUg2jghxD";
  //const tracksList = await getTopTrackPlaylist(playlistId);

  const tracksList = await useTrackList();
  const topArtist = tracksList[0]?.track.artists[0].name;
  const topTrack = tracksList[0]?.track.name;

  return (
    <div className="h-screen ">
      <HeaderMain />
      <div className="w-[1043px] mx-auto mt-[300px]">
        <ChartTop topArtist={topArtist} topTrack={topTrack} />
        <div className="flex items-center justify-between mt-10">
          <ChartComponent tracksList={tracksList} />
          <ChartComponent tracksList={tracksList} />
        </div>
      </div>
    </div>
  );
}
