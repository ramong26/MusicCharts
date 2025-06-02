import { YoutubeVideo } from "../types/youtube-video";

export default async function getTrackIdVideo(
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
