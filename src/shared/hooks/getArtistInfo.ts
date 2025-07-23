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

  const fetchLabel = async (id: string) => {
    const res = await fetch(
      `https://www.wikidata.org/wiki/Special:EntityData/${id}.json`
    );
    const json = await res.json();
    return (
      json.entities?.[id]?.labels?.ko?.value ||
      json.entities?.[id]?.labels?.en?.value
    );
  };

  const gender = genderId ? await fetchLabel(genderId) : undefined;
  const nationality = nationalityId
    ? await fetchLabel(nationalityId)
    : undefined;

  return {
    artistName,
    gender,
    nationality,
    birthDate,
  };
}
// 사용법 await getArtistInfo('Beyoncé');
