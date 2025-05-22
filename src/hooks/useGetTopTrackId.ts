import { Track } from '@/types/playlist'
import { useState, useEffect } from 'react'

export default function useGetTopTrackId(id?: string) {
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const tokenRes = await fetch('/api/spotify-token')
        const { access_token } = await tokenRes.json()

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
        setTrack(data)
      } catch (error) {
        const err = error as Error
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])
  return { track, loading, error }
}
