import { useState, useEffect } from 'react'
import { Track, Album } from '@/types/playlist'

export default function useGetTopTrackIdAlbum(track: Track | null) {
  const [album, setAlbum] = useState<Album | null>(null)
  const [albumLoading, setAlbumLoading] = useState(true)
  const [albumError, setAlbumError] = useState<Error | null>(null)
  useEffect(() => {
    if (!track?.album?.id) return
    async function fetchData() {
      setAlbumLoading(true)
      setAlbumError(null)
      try {
        const tokenRes = await fetch('/api/spotify-token')
        const { access_token } = await tokenRes.json()

        const topTrackRes = await fetch(
          `https://api.spotify.com/v1/albums/${track?.album?.id}`,
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
        setAlbum(data)
      } catch (error) {
        const err = error as Error
        setAlbumError(err)
      } finally {
        setAlbumLoading(false)
      }
    }

    fetchData()
  }, [track])
  return { album, albumLoading, albumError }
}
