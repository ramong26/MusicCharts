import HeaderMain from '@/shared/components/HeaderMain';
import ChartTop from '@/features/chart/components/ChartTop';
import ChartComponent from '@/features/chart/components/ChartComponent';

import { getTrackList } from '@/shared/hooks/getTrackList';

export default async function Charts() {
  const tracksList = await getTrackList({ playlistId: '1PcB3QM5sGbzFU5D9CbEGB' });
  const koraTracksList = await getTrackList({
    playlistId: '1Gg5BI7b5xljyHnGXXrX0E',
  });
  const usaTracksList = await getTrackList({
    playlistId: '0TyhU3nPbWY8BNObcPXt4u',
  });

  return (
    <div className="h-screen ">
      <HeaderMain />
      <div className="w-[1043px]  mx-auto mt-[300px] ">
        <ChartTop tracksList={tracksList} />
        <div className="flex items-center justify-between  w-full gap-10 pb-10">
          <ChartComponent tracksList={koraTracksList} title="한국 Top 50" />
          <ChartComponent tracksList={usaTracksList} title="미국 Top 50" />
        </div>
      </div>
    </div>
  );
}
