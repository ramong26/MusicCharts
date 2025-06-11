import { CustomSearchResult } from "../types/custom-search";

export default async function getTrackIdInterview(
  trackName: string
): Promise<CustomSearchResult[]> {
  const API_KEY = process.env.GOOGLE_API_KEY!;
  const CSE_ID = process.env.GOOGLE_CSE_ID!;

  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(
      trackName + " interview"
    )}`,
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
