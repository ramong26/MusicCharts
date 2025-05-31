import { useQuery } from "@tanstack/react-query";
import { YoutubeVideo } from "../types/youtube-video";

export default function useGetTrackVideo(trackName: string) {
  return useQuery<YoutubeVideo[]>({
    queryKey: ["youtubeSearch", trackName],
    queryFn: async () => {
      const res = await fetch(
        `/api/youtube-search?q=${encodeURIComponent(trackName)}`,
        {
          method: "GET", // 명시적으로 GET 요청
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch YouTube videos");
      }

      const data = await res.json();
      return data.items || [];
    },
    enabled: !!trackName,
  });
}
