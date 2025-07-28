import Image from 'next/image';

import { getYoutubeChannelInfo } from '@/features/tracks/hooks/getYoutube';

export default async function YoutubeChannels() {
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

  return (
    <div className="relative border-3 border-black p-10 mt-10 max-w-7xl mx-auto bg-white">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black  text-white px-6 py-2 border-2 border-black font-bold text-xl">
        이번 달 추천 플레이리스트 채널
      </div>

      {/* 채널 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
        {channelInfos.map((channel, idx) => (
          <div
            key={channel.id || idx}
            className="border border-black p-6 text-center flex flex-col items-center"
          >
            <Image
              src={channel.snippet?.thumbnails?.high?.url}
              alt="Channel Profile"
              width={96}
              height={96}
              className="rounded-full"
            />
            <h2 className="text-lg font-semibold mt-4">{channel.snippet?.title}</h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {channel.snippet?.description}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              구독자 {Number(channel.statistics?.subscriberCount).toLocaleString()}명 · 영상{' '}
              {channel.statistics?.videoCount}개
            </p>
            <a
              href={`https://www.youtube.com/@${channelHandles[idx]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline inline-block mt-4 text-sm"
            >
              채널 방문하기 →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
