import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('query') || '';
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${encodeURIComponent(
        q
      )}`
    );

    if (!response.ok) {
      console.error('Failed to fetch data from Wikipedia:', response.statusText);
      throw new Error('Failed to fetch data from Wikipedia');
    }

    const data = await response.json();
    const topResult = data.query?.search?.[0];
    return NextResponse.json({
      title: topResult?.title || '',
    });
  } catch (e) {
    console.error('Error fetching top wiki title:', e);
    return null;
  }
}
