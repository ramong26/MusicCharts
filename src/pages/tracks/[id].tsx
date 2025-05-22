import { useRouter } from 'next/router'

import useGetTopTrackId from '../../hooks/useGetTopTrackId'
import useGetTopTrackIdAlbum from '../../hooks/useGetTopTrackIdAlbum'
import useGetTrackVideo from '../../hooks/useGetTrackVideo'

export default function Tracks() {
  const router = useRouter()
  const { id } = router.query as { id?: string }

  // 트랙 id를 넣으면 해당 트랙의 상세 페이지로 이동하는 커스텀 훅
  const { track, loading, error } = useGetTopTrackId(id)
  // 각 트랙 id에 해당하는 앨범 정보를 가져오는 커스텀 훅
  const { album, albumLoading, albumError } = useGetTopTrackIdAlbum(track)
  // 각 트랙 id에 해당하는 뮤직비디오 정보를 가져오는 커스텀 훅
  const { videos, videosLoading } = useGetTrackVideo(track?.name ?? '')

  console.log(track)
  console.log(album)
  if (loading && albumLoading && videosLoading) return <p>로딩 중...</p>
  if (error && albumError) return <p>에러: {error.message}</p>
  return (
    <div>
      <div>곡정보</div>
      <div>
        <div>곡 제목: {track?.name}</div>
        <div>
          아티스트: {track?.artists.map((artist) => artist.name).join(', ')}
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
      <div>
        <img src={album?.images[0]?.url} alt={album?.name} />
      </div>
      <div>뮤직비디오</div>
      <div>
        {videos.map((video) => (
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
    </div>
  )
}
