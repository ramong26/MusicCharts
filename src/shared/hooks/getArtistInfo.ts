// 위키피디아 데이터베이스에서 아티스트 정보를 가져오는 함수
export async function getArtistInfo(artistName: string) {
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

  const detailRes = await fetch(
    `https://www.wikidata.org/wiki/Special:EntityData/${getId}.json`
  );
  const detailData = await detailRes.json();
  const entity = detailData.entities?.[getId];

  const genderId = entity?.claims?.P21?.[0]?.mainsnak?.datavalue?.value?.id;
  const nationalityId =
    entity?.claims?.P27?.[0]?.mainsnak?.datavalue?.value?.id;
  const birthDate = entity?.claims?.P569?.[0]?.mainsnak?.datavalue?.value;

  const fetchLabels = async (ids: string[]) => {
    const cachedLabels: Record<string, string> = {};
    const uncachedIds = ids.filter((id) => !cachedLabels[id]);
    if (uncachedIds.length > 0) {
      const responses = await Promise.all(
        uncachedIds.map((id) =>
          fetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)
        )
      );
      const jsonResponses = await Promise.all(
        responses.map((res) => res.json())
      );
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
  const [gender, nationality] = await fetchLabels(
    [genderId, nationalityId].filter((id) => id !== undefined)
  );

  return {
    artistName,
    gender,
    nationality,
    birthDate,
  };
}
// 사용법 await getArtistInfo('Beyoncé');
