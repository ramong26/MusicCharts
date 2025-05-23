import { useQuery } from '@tanstack/react-query'
import { Track, Album } from '@/types/playlist'

export default function useGetTopTrackIdAlbum(track: Track | null) {
  //useQuery를 사용하면 비동기 데이터 요청과 상태관리를 한번에 할 수 있음
  return useQuery<Album>({
    // 쿼리의 고유 key를 트랙의 앨범 id로 설정
    queryKey: ['topTrackAlbum', track?.album?.id],
    // 실제 데이터를 가져오는 비동기 함수
    queryFn: async () => {
      if (!track?.album?.id) return null
      // 토큰 가져오기
      const tokenRes = await fetch('/api/spotify-token')
      const { access_token } = await tokenRes.json()

      // 스포티파이 API 호출
      const topTrackRes = await fetch(
        `https://api.spotify.com/v1/albums/${track?.album?.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      // 에러 처리
      if (!topTrackRes.ok) {
        throw new Error('Failed to fetch data')
      }
      // 데이터를 json 형식으로 변환
      const data = await topTrackRes.json()
      return data
    },

    enabled: !!track?.album?.id, // id가 있을 때만 쿼리 실행
    staleTime: 1000 * 60, // 5분
  })
}

// 초기코드
// import { useState, useEffect } from 'react'
// import { Track, Album } from '@/types/playlist'

// export default function useGetTopTrackIdAlbum(track: Track | null) {
//   const [album, setAlbum] = useState<Album | null>(null)
//   const [albumLoading, setAlbumLoading] = useState(true)
//   const [albumError, setAlbumError] = useState<Error | null>(null)
//   useEffect(() => {
//     if (!track?.album?.id) return
//     async function fetchData() {
//       setAlbumLoading(true)
//       setAlbumError(null)
//       try {
//         const tokenRes = await fetch('/api/spotify-token')
//         const { access_token } = await tokenRes.json()

//         const topTrackRes = await fetch(
//           `https://api.spotify.com/v1/albums/${track?.album?.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${access_token}`,
//             },
//           }
//         )

//         if (!topTrackRes.ok) {
//           throw new Error('Failed to fetch data')
//         }

//         const data = await topTrackRes.json()
//         setAlbum(data)
//       } catch (error) {
//         const err = error as Error
//         setAlbumError(err)
//       } finally {
//         setAlbumLoading(false)
//       }
//     }

//     fetchData()
//   }, [track])
//   return { album, albumLoading, albumError }
// }
