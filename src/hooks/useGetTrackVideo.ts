// import { useEffect, useState } from 'react'
// import { YoutubeVideo } from '@/types/youtube-video'

// export default function useGetTrackVideo(trackName: string) {
//   const [videos, setVideos] = useState<YoutubeVideo[]>([])
//   const [videosLoading, setVideosLoading] = useState(false)

//   useEffect(() => {
//     async function fetchData() {
//       setVideosLoading(true)
//       try {
//         const res = await fetch(
//           `/api/youtube-search?q=${encodeURIComponent(trackName)}`
//         )
//         const data = await res.json()
//         setVideos(data.items || [])
//       } catch (err) {
//         console.error('Error fetching YouTube:', err)
//       } finally {
//         setVideosLoading(false)
//       }
//     }

//     if (trackName) {
//       fetchData()
//     }
//   }, [trackName])

//   return { videos, videosLoading }
// }

import { useQuery } from '@tanstack/react-query'
import { YoutubeVideo } from '@/types/youtube-video'

export default function useGetTrackVideo(trackName: string) {
  return useQuery<YoutubeVideo[]>({
    queryKey: ['youtubeSearch', trackName],
    queryFn: async () => {
      const res = await fetch(
        `/api/youtube-search?q=${encodeURIComponent(trackName)}`
      )
      const data = await res.json()
      return data.items || []
    },
    enabled: !!trackName, // trackName이 있을 때만 쿼리 실행
  })
}
