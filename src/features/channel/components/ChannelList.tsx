import Image from 'next/image';

import { getYoutubeChannelInfo } from '@/features/tracks/hooks/getYoutube';

export default async function ChannelList({ title }: { title: string }) {
  if (!title) {
    return null;
  }

  // 여기 해야함
  const channelHandles = (() => {
    switch (title) {
      case '믹스 채널 추천':
        return ['RAPHAEL_MIXES', 'retapestudios', 'HumanoStudios'];
      case 'Jazz 채널 추천':
        return ['ICYFOG', 'midnightradio2', 'RetroCafeRadio'];
      case 'Hiphop 채널 추천':
        return ['peddlermusic'];
      case 'Rock 채널 추천':
        return ['On8ight'];
      default:
        return [];
    }
  })();

  const channelInfos = await Promise.all(
    channelHandles.map((handle) => getYoutubeChannelInfo(handle))
  );
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="list-disc flex flex-col gap-6">
        {channelInfos.map((channel, idx) => (
          <div
            key={channel.id}
            className="border-3 border-black p-6 text-center flex items-center justify-between h-fit gap-4"
          >
            <div className="flex flex-col items-center justify-center w-[150px]">
              <Image
                src={channel.snippet?.thumbnails?.high?.url}
                alt="Channel Profile"
                width={96}
                height={96}
                className="rounded-full"
              />
              <h2 className="text-lg font-semibold mt-4">{channel.snippet?.title}</h2>
            </div>
            <p className="text-gray-600 text-xl font-semibold mt-2 line-clamp-3 w-[600px]">
              {channel.snippet?.description}
            </p>
            <a
              href={`https://www.youtube.com/@${channelHandles[idx]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline inline-block mt-4 text-md"
            >
              채널 방문하기 →
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
}
