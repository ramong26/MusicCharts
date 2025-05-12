import { useEffect, useState } from 'react'

export default function Home() {
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    async function fetchData() {
      const tokenRes = await fetch('/api/token')
      const { access_token } = await tokenRes.json()

      const playlistRes = await fetch(
        'https://api.spotify.com/v1/playlists/2fmFoUa7WNxIfvUg2jghxD',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      const data = await playlistRes.json()
      setTracks(data.tracks.items)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>🎵 Top 50 Global</h1>
      <ul>
        {tracks.map((item: any, index) => (
          <li key={index}>
            {item.track.name} - {item.track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  )
}
