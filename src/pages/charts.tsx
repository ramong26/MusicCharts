import Image from 'next/image'
import { useRouter } from 'next/router'

import useGetTopTrackPlaylist from '../hooks/useGetTopTrackPlaylist'

export default function Charts() {
  const router = useRouter()

  // 플레이리스트 id를 넣으면 해당 플레이리스트의 트랙을 가져오는 커스텀 훅
  const {
    data: tracks,
    isLoading,
    error,
  } = useGetTopTrackPlaylist('2fmFoUa7WNxIfvUg2jghxD')

  // 트랙 클릭 시 해당 트랙의 상세 페이지로 이동
  const handleClickTrack = (trackId: string) => {
    router.push(`tracks/${trackId}`)
  }

  if (isLoading) return <p>로딩 중...</p>
  if (error) return <p>에러: {error.message}</p>

  return (
    <div>
      <h1>🎵 Top 50 Global</h1>
      <ul>
        {(tracks ?? []).map((item, index) => (
          <li key={index} onClick={() => handleClickTrack(item.track.id)}>
            <Image
              src={item.track.album.images[0].url}
              alt="앨범표지"
              width={300}
              height={300}
              priority
            />
            {item.track.name} - {item.track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  )
}
