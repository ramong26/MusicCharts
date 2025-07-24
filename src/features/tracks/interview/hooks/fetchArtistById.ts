export default async function fetchArtistById(artistId: string | undefined) {
  if (!artistId) return null;
  const res = await fetch(`/api/spotify/artist/${artistId}`);
  if (!res.ok) throw new Error('Failed to fetch artist');
  return res.json();
}
