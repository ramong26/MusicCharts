import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('query') || '';

  if (!q) {
    return NextResponse.json({ error: 'Query parameter query is required' }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'YouTube API key is missing' }, { status: 500 });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
        q
      )}&key=${apiKey}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'YouTube API request failed' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    return NextResponse.json({ error: 'Failed to fetch data from YouTube API' }, { status: 500 });
  }
}
