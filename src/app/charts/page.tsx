import getTopTrackPlaylist from "@/features/chart/hooks/getTopTrackPlaylist";
import Link from "next/link";

export default async function Charts() {
  const playlistId = "2fmFoUa7WNxIfvUg2jghxD";
  const tracksList = await getTopTrackPlaylist(playlistId);

  return (
    <div>
      <h1>🎵 Top 50 Global</h1>
      <ul>
        {(tracksList ?? []).map((item) => (
          <Link key={item.track.id} href={`/tracks/${item.track.id}`}>
            <img
              src={item.track.album.images[0].url}
              alt="앨범표지"
              width={300}
              height={300}
              className="cursor-pointer"
            />
            {item.track.name} - {item.track.artists[0].name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
