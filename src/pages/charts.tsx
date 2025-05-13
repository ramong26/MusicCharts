import { useEffect, useState } from 'react'
import Image from 'next/image'
import { TrackItem } from '../types/playlist'
export default function Home() {
  const [tracks, setTracks] = useState<TrackItem[]>([])

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
      console.log(data)
      setTracks(data.tracks.items)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>🎵 Top 50 Global</h1>
      <ul>
        {tracks.map((item, index) => (
          <li key={index}>
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
