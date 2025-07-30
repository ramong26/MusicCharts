import { ArtistWiki } from '@/features/tracks/types/WikiArtist';
import { WikidataSearchResponse, WikidataEntityData } from '@/shared/types/wikidata';

// 위키피디아 데이터베이스에서 아티스트 정보를 가져오는 함수
export default async function getArtistInfo(artistName: string): Promise<ArtistWiki> {
  // 1. 아티스트 검색
  const searchRes = await fetch(
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
      artistName
    )}&language=en&format=json&origin=*`
  );
  const searchData: WikidataSearchResponse = await searchRes.json();
  const getId = searchData.search?.[0]?.id;

  if (!getId) {
    throw new Error('Artist not found');
  }

  // 2. 아티스트 상세 정보 가져오기
  const detailRes = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${getId}.json`);
  const detailData: WikidataEntityData = await detailRes.json();
  const entity = detailData.entities?.[getId];
  if (!entity) {
    throw new Error('Entity data not found');
  }

  // 3. ID 추출 (string | undefined 배열 포함)
  const genderId = entity?.claims?.P21?.[0]?.mainsnak?.datavalue?.value?.id;
  const nationalityId = entity?.claims?.P27?.[0]?.mainsnak?.datavalue?.value?.id;
  const birthDate = entity?.claims?.P569?.[0]?.mainsnak?.datavalue?.value as
    | { time: string }
    | undefined;

  const genreIds = (entity?.claims?.P136 ?? [])
    .map((c) => c?.mainsnak?.datavalue?.value?.id)
    .filter((id): id is string => !!id);

  const labelIds = (entity?.claims?.P1448 ?? [])
    .map((c) => c?.mainsnak?.datavalue?.value?.id)
    .filter((id): id is string => !!id);

  const awardIds = (entity?.claims?.P166 ?? [])
    .map((c) => c?.mainsnak?.datavalue?.value?.id)
    .filter((id): id is string => !!id);

  // 4. 레이블명(문자열) 가져오기 함수 (ko 우선, 없으면 en)
  const fetchLabels = async (ids: string[]): Promise<string[]> => {
    const cachedLabels: Record<string, string> = {};
    const uncachedIds = ids.filter((id) => !(id in cachedLabels));
    if (uncachedIds.length > 0) {
      const responses = await Promise.all(
        uncachedIds.map((id) =>
          fetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)
        )
      );
      const jsonResponses = await Promise.all(responses.map((res) => res.json()));

      jsonResponses.forEach((json, index) => {
        const id = uncachedIds[index];
        const label =
          json.entities?.[id]?.labels?.ko?.value ?? json.entities?.[id]?.labels?.en?.value ?? '';
        cachedLabels[id] = label;
      });
    }
    return ids.map((id) => cachedLabels[id] || '');
  };

  // 5. 모든 레이블 가져오기
  const [genderArr, nationalityArr, genres, labels, awards] = await Promise.all([
    fetchLabels(genderId ? [genderId] : []),
    fetchLabels(nationalityId ? [nationalityId] : []),
    fetchLabels(genreIds),
    fetchLabels(labelIds),
    fetchLabels(awardIds),
  ]);

  // 6. 결과 객체 반환
  return {
    artistName,
    gender: genderArr[0] || '',
    nationality: nationalityArr[0] || '',
    birthDate,
    genres: genres.filter(Boolean),
    labels: labels.filter(Boolean),
    awards: awards.filter(Boolean),
  };
}

// 사용법
// const result = await getArtistInfo('Beyoncé');
