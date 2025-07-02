import { CustomSearchResult } from "../types/custom-search";

export default async function getTrackIdInterview(
  who: string
): Promise<CustomSearchResult[]> {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY!;
    const CSE_ID = process.env.GOOGLE_CSE_ID!;

    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(
        who
      )}`,
      {
        next: { revalidate: 60 * 60 * 24 },
      }
    );

   if (!res.ok) {
  const errorText = await res.text();
  console.error("Google API 호출 실패:", res.status, res.statusText, errorText);
   throw new Error("Failed to fetch interview search results");
}

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("getTrackIdInterview() 에러:", error);
    return [];
  }
}
// 사용법:  const interviews = await getTrackIdInterview(who);
