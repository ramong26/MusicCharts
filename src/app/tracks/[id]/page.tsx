import getTrackId from "@/features/tracks/hooks/getTrackId";
import getTrackIdAlbum from "@/features/tracks/hooks/getTrackIdAlbum";
import getTrackIdVideo from "@/features/tracks/hooks/getTrackIdVideo";
import getTrackIdInterview from "@/features/tracks/hooks/getTrackIdInterview";
import Link from "next/link";

interface TrackPageProps {
  params: { id: string };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const trackId = params.id;
  // trackId로 트랙 정보 받아옴
  const track = await getTrackId(trackId);
  console.log("track", track);
  // trackId로 앨범 정보 받아옴
  const album = await getTrackIdAlbum(track);
  // trackId로 유튜브 비디오 정보 받아옴
  const videos = await getTrackIdVideo(track.name);
  // trackId로 인터뷰 정보 받아옴
  const interviews = await getTrackIdInterview(track.name);

  return (
    <div>
      <div>곡정보</div>
      <div>
        <div>곡 제목: {track?.name}</div>
        <div>
          아티스트: {track?.artists.map((artist) => artist.name).join(", ")}
        </div>
      </div>
      <div>앨범 정보: {album?.name}</div>
      <div>
        {album?.tracks?.items.map((item) => (
          <div key={item.id}>
            <div>곡 제목: {item.name}</div>
          </div>
        ))}
      </div>
      <div>앨범 발매일: {album?.release_date}</div>
      <div>앨범 총 트랙 수: {album?.total_tracks}</div>
      <Link href={track.album.external_urls.spotify}>
        <img src={album?.images[0]?.url} alt={album?.name} />
      </Link>
      <div>뮤직비디오</div>
      <div>
        {(videos ?? []).map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <iframe
              width="1120"
              height="630"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ))}
      </div>
      <div>인터뷰</div>
      <div>
        {(interviews ?? []).map((interview, index) => (
          <Link href={interview.link} key={index}>
            <h3>{interview.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
