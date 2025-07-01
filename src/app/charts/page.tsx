import HeaderMain from "@/shared/components/HeaderMain";
import ChartTop from "@/features/chart/components/ChartTop";
import ChartComponent from "@/features/chart/components/ChartComponent";

import useTrackList from "@/shared/hooks/useTrackList";

export default async function Charts() {
  // const playlistId = "2fmFoUa7WNxIfvUg2jghxD";

  const tracksList = await useTrackList();

  return (
    <div className="h-screen ">
      <HeaderMain />
      <div className="w-[1043px] mx-auto mt-[300px]">
        <ChartTop tracksList={tracksList} />
        <div className="flex items-center justify-between mt-10">
          <ChartComponent tracksList={tracksList} />
          <ChartComponent tracksList={tracksList} />
        </div>
      </div>
    </div>
  );
}
