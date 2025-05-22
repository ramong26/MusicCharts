import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import useGetTopTrackPlaylist from '../hooks/useGetTopTrackPlaylist'

export default function Charts() {
  const [playlistId, setPlaylistId] = useState('')
  const router = useRouter()

  // 플레이리스트 id를 넣으면 해당 플레이리스트의 트랙을 가져오는 커스텀 훅
  const { track: tracks } = useGetTopTrackPlaylist(playlistId)

  // 트랙 클릭 시 해당 트랙의 상세 페이지로 이동
  const handleClickTrack = (trackId: string) => {
    router.push(`tracks/${trackId}`)
  }

  return (
    <div>
      <h1>플레이리스트 링크</h1>
      <input
        type="text"
        placeholder="플레이리스트 링크를 입력하세요"
        value={playlistId}
        onChange={(e) => setPlaylistId(e.target.value)}
      />
      <ul>
        {tracks.map((item, index) => (
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
