import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title');
  if (!title) {
    return NextResponse.json({ error: 'No title provided' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    if (!response.ok) throw new Error('Summary not found');
    const data = await response.json();
    console.log('Fetched summary:', data);
    return NextResponse.json({ extract: data.extract || 'No summary available' });
  } catch (e) {
    console.error('Error fetching wiki summary:', e);
    return NextResponse.json({ extract: 'No summary available' }, { status: 500 });
  }
}
