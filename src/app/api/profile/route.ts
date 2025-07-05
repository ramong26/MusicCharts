import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const tokenObj = req.cookies.get('access_token');
  const token = tokenObj?.value;
  if (!token) {
    return NextResponse.json(
      { error: 'Access token not provided' },
      { status: 401 }
    );
  }
  console.log('Access Token:', token);
  try {
    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Spotify profile' },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      name: data.display_name || '사용자',
      imageUrl: data.images?.[0]?.url || undefined,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
