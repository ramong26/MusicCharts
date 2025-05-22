import { TrackItem } from '@/types/playlist'
import { useState, useEffect } from 'react'

export default function useGetTopTrackPlaylist(playlistId: string) {
  const [track, setTrack] = useState<TrackItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
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
        setTrack(data.tracks.items)
      } catch (error) {
        const err = error as Error
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [playlistId])

  return { track, loading, error }
}
// https://open.spotify.com/playlist/3iFEvv7Nt36S4GqTpgntGZ?si=MkvaptydS-GqWfBKSiBeTQ
