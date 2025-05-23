import { useQuery } from '@tanstack/react-query'
import { TrackItem } from '@/types/playlist'

export default function useGetTopTrackPlaylist(playlistId: string) {
  return useQuery<TrackItem[]>({
    queryKey: ['topTrackPlaylist', playlistId],
    queryFn: async () => {
      const tokenRes = await fetch('/api/spotify-token')
      const { access_token } = await tokenRes.json()

      const playlistRes = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      if (!playlistRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await playlistRes.json()
      return data.tracks.items
    },
    enabled: !!playlistId, // playlistId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60, // 5분
  })
}
// https://open.spotify.com/playlist/3iFEvv7Nt36S4GqTpgntGZ?si=MkvaptydS-GqWfBKSiBeTQ

// 초기 코드
// import { TrackItem } from '@/types/playlist'
// import { useState, useEffect } from 'react'

// export default function useGetTopTrackPlaylist(playlistId: string) {
//   const [track, setTrack] = useState<TrackItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<Error | null>(null)

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true)
//       setError(null)
//       try {
//         const tokenRes = await fetch('/api/spotify-token')
//         const { access_token } = await tokenRes.json()

//         const playlistRes = await fetch(
//           `https://api.spotify.com/v1/playlists/${playlistId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${access_token}`,
//             },
//           }
//         )

//         if (!playlistRes.ok) {
//           throw new Error('Failed to fetch data')
//         }

//         const data = await playlistRes.json()
//         setTrack(data.tracks.items)
//       } catch (error) {
//         const err = error as Error
//         setError(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [playlistId])

//   return { track, loading, error }
// }
// https://open.spotify.com/playlist/3iFEvv7Nt36S4GqTpgntGZ?si=MkvaptydS-GqWfBKSiBeTQ
