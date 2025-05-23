import { useQuery } from '@tanstack/react-query'
import { Track } from '@/types/playlist'

export default function useGetTopTrackId(id?: string) {
  return useQuery<Track>({
    queryKey: ['topTrack', id],
    queryFn: async () => {
      if (!id) return null
      // 토큰 가져오기
      const tokenRes = await fetch('/api/spotify-token')
      const { access_token } = await tokenRes.json()

      // 스포티파이 API 호출
      const topTrackRes = await fetch(
        `https://api.spotify.com/v1/tracks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      if (!topTrackRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await topTrackRes.json()
      return data
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 1000 * 60, // 5분
  })
}
