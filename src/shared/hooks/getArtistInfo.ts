import { ArtistWiki } from '@/features/tracks/types/WikiArtist';
// 위키피디아 데이터베이스에서 아티스트 정보를 가져오는 함수
export default async function getArtistInfo(artistName: string): Promise<ArtistWiki> {
  const searchRes = await fetch(
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
      artistName
    )}&language=en&format=json&origin=*`
  );

  const searchData = await searchRes.json();
  const getId = searchData.search?.[0]?.id;

  if (!getId) {
    throw new Error('Artist not found');
  }

  const detailRes = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${getId}.json`);
  const detailData = await detailRes.json();
  const entity = detailData.entities?.[getId];

  // 아티스트의 기본 정보 추출
  const genderId = entity?.claims?.P21?.[0]?.mainsnak?.datavalue?.value?.id;
  const nationalityId = entity?.claims?.P27?.[0]?.mainsnak?.datavalue?.value?.id;
  const birthDate = entity?.claims?.P569?.[0]?.mainsnak?.datavalue?.value;
  const genreIds =
    entity?.claims?.P136?.map((c: any) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean) || [];
  const labelIds =
    entity?.claims?.P1448?.map((c: any) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean) || [];
  const awardIds =
    entity?.claims?.P166?.map((c: any) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean) || [];

  const fetchLabels = async (ids: string[]) => {
    const cachedLabels: Record<string, string> = {};
    const uncachedIds = ids.filter((id) => !cachedLabels[id]);
    if (uncachedIds.length > 0) {
      const responses = await Promise.all(
        uncachedIds.map((id) =>
          fetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)
        )
      );
      const jsonResponses = await Promise.all(responses.map((res) => res.json()));
      jsonResponses.forEach((json, index) => {
        const id = uncachedIds[index];
        cachedLabels[id] =
          json.entities?.[id]?.labels?.ko?.value ||
          json.entities?.[id]?.labels?.en?.value ||
          undefined;
      });
    }
    return ids.map((id) => cachedLabels[id]);
  };

   const results = await Promise.all([
    fetchLabels([genderId]),
    fetchLabels([nationalityId]),
    fetchLabels(genreIds),
    fetchLabels(labelIds),
    fetchLabels(awardIds),
  ]);
  const gender = results[0][0];
  const nationality = results[1][0];
  const genres = results[2];
  const labels = results[3];
  const awards = results[4];


  return {
    artistName,
    gender,
    nationality,
    birthDate,
    genres,
    labels,
    awards,
  };
}
// 사용법 await getArtistInfo('Beyoncé');
