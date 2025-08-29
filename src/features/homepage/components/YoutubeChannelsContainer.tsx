import YoutubeChannels from '@/features/homepage/components/YoutubeChannelClient';
import { getYoutubeChannelInfo } from '@/features/tracks/hooks/getYoutubeMongo';

export default async function YoutubeChannelsContainer() {
  const channelHandles = [
    'tsumi_chan',
    'broadplay',
    'boilerroom',
    'HumanoStudios',
    'mihonreko',
    'What_Is_Mabisyo',
  ];

  const channelInfos = await Promise.all(
    channelHandles.map((handle) => getYoutubeChannelInfo(handle))
  );

  return <YoutubeChannels channels={channelInfos} />;
}
