import HeaderMain from '@/shared/components/HeaderMain';
import ChannelList from '@/features/channel/components/ChannelList';
import YoutubeChannels from '@/features/homepage/components/YoutubePlaylist';
export default function ChannelPage() {
  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex flex-col mt-[188px] gap-4 h-[617px] w-[1043px] mx-auto">
        <YoutubeChannels />
        <div className="flex flex-col gap-10 w-full">
          <ChannelList title={'믹스 채널 추천'} />
          <ChannelList title={'Jazz 채널 추천'} />
          <ChannelList title={'Hiphop 채널 추천'} />
          <ChannelList title={'Rock 채널 추천'} />
        </div>
      </main>
    </div>
  );
}
