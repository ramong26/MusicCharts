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

  try {
    const res = await fetch('https://api.spotify.com/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Spotify user' },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      name: data.display_name || '사용자',
      imageUrl: data.images?.[0]?.url || undefined,
      id: data.id || undefined,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
