import { YoutubeVideo } from "../types/youtube-video";

// 유튜브 비디오를 가져오는 함수
export async function getYoutubeTrackIdVideo(
  trackName: string
): Promise<YoutubeVideo[]> {
  const baseUrl = "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/youtube-search?q=${encodeURIComponent(trackName)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  const data = await res.json();
  return data.items || [];
}

// 유튜브 채널 가져오는 함수
export async function getYoutubeChannelInfo(channelHandle: string) {
  const API_KEY = process.env.GOOGLE_API_KEY!;
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
      "@" + channelHandle
    )}&key=${API_KEY}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  const channelId = data.items?.[0]?.snippet?.channelId;

  if (!channelId) throw new Error("채널을 찾을 수 없습니다");

  const detailRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&id=${channelId}&key=${API_KEY}`
  );
  const detailData = await detailRes.json();
  return detailData.items?.[0];
}
