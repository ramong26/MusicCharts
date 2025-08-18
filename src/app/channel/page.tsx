import HeaderMain from '@/shared/components/HeaderMain/HeaderMain';
import ChannelList from '@/features/channel/components/ChannelList';
import YoutubeChannels from '@/features/homepage/components/YoutubePlaylist';

export const metadata = {
  title: 'Music Channel Recommendation',
  description: 'Discover new music channels tailored for you',
};

export const revalidate = 60 * 60 * 24;

export default function ChannelPage() {
  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex flex-col mt-[188px] gap-4 h-[617px] w-[1043px] mx-auto">
        <YoutubeChannels />
        <div className="flex flex-col gap-10 w-full pb-[100px]">
          {['믹스 채널 추천', 'Jazz 채널 추천', 'Hiphop 채널 추천', 'Rock 채널 추천'].map(
            (title) => (
              <ChannelList key={title} title={title} />
            )
          )}
        </div>
      </main>
    </div>
  );
}
