import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Tracks() {
  const [track, setTrack] = useState<any>(null)
  const [album, setAlbum] = useState<any>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function fetchData() {
      const tokenRes = await fetch('/api/token')
      const { access_token } = await tokenRes.json()

      const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const data = await trackRes.json()
      setTrack(data)
    }

    fetchData()
  }, [id])

  console.log(track)

  useEffect(() => {
    if (!track || !track.album?.id) return

    async function fetchAlbum() {
      const tokenRes = await fetch('/api/token')
      const { access_token } = await tokenRes.json()

      const albumRes = await fetch(
        `https://api.spotify.com/v1/albums/${track.album.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      const data = await albumRes.json()
      setAlbum(data)
    }

    fetchAlbum()
  }, [track])
  console.log(album)

  return (
    <div>
      <div>곡정보</div>
      <div>
        <div>곡 제목</div>
        <div>아티스트</div>
      </div>
      <div>앨범 정보</div>
    </div>
  )
}
