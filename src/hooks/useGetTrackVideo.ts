import { useEffect, useState } from 'react'
import { YoutubeVideo } from '@/types/youtube-video'

export default function useGetTrackVideo(trackName: string) {
  const [videos, setVideos] = useState<YoutubeVideo[]>([])
  const [videosLoading, setVideosLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setVideosLoading(true)
      try {
        const res = await fetch(
          `/api/youtube-search?q=${encodeURIComponent(trackName)}`
        )
        const data = await res.json()
        setVideos(data.items || [])
      } catch (err) {
        console.error('Error fetching YouTube:', err)
      } finally {
        setVideosLoading(false)
      }
    }

    if (trackName) {
      fetchData()
    }
  }, [trackName])

  return { videos, videosLoading }
}
