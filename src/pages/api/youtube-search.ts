import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 쿼리 파라미터에서 q를 가져옵니다.
  const { q } = req.query
  // 쿼리 파라미터 q가 없거나 배열인 경우 에러를 반환합니다.
  if (!q || Array.isArray(q)) {
    res.status(400).json({ error: 'Query parameter q is required' })
    return
  }
  // YouTube API 키를 환경 변수에서 가져옵니다.
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
        q
      )}&key=${apiKey}`
    )
    // json() 메서드를 사용하여 응답을 JSON 형식으로 변환합니다.
    const data = await response.json()
    console.log('YouTube API 응답:', data)
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching YouTube data:', error)
    res.status(500).json({ error: 'Failed to fetch data from YouTube API' })
  }
}
