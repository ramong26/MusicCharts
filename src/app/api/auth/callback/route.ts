export const runtime = 'nodejs'; // 몽고로 인해 nodejs 런타임 사용
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongo/mongo';
import { UserModel } from '@/lib/mongo/models/UserModel';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code not found' },
      { status: 400 }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

  if (!clientId || !clientSecret || !redirectUri) {
    console.error('Missing Spotify environment variables');
    return NextResponse.json(
      { error: 'Server configuration error: missing environment variables' },
      { status: 500 }
    );
  }

  // 토큰 요청 바디
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  });

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  );

  try {
    // 토큰 요청
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: body.toString(),
    });

    if (!tokenRes.ok) {
      const errorData = await tokenRes.json();
      console.error('Token request failed:', errorData);
      return NextResponse.json(
        { error: errorData },
        { status: tokenRes.status }
      );
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token || '';
    // 사용자 프로필 요청
    const profileRes = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileRes.ok) {
      const errorProfile = await profileRes.json();
      console.error('Profile request failed:', errorProfile);
      return NextResponse.json(
        { error: errorProfile },
        { status: profileRes.status }
      );
    }

    const profileData = await profileRes.json();

    // DB 연결
    await connectToDB();

    // 사용자 정보 저장 (upsert)
    const user = await UserModel.findOneAndUpdate(
      { spotifyId: profileData.id },
      {
        spotifyId: profileData.id,
        displayName: profileData.display_name || 'No Name',
        email: profileData.email || 'noemail@example.com',
        profileImageUrl: profileData.images?.[0]?.url || '',
        lastLogin: new Date(),
        accessToken,
        refreshToken,
      },
      { upsert: true, new: true }
    );
    console.log('user:', user);
    const payload = {
      userId: user._id.toString(),
    };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // 리다이렉트 응답 생성 및 쿠키 설정
    const response = NextResponse.redirect(baseUrl);

    response.cookies.set('jwt', jwtToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenData.expires_in ?? 3600,
    });

    return response;
  } catch (error) {
    console.error('Unexpected error in auth callback:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get('code');

//   if (!code) {
//     return NextResponse.json(
//       { error: 'Authorization code not found' },
//       { status: 400 }
//     );
//   }

//   if (
//     !process.env.SPOTIFY_CLIENT_ID ||
//     !process.env.SPOTIFY_CLIENT_SECRET ||
//     !process.env.SPOTIFY_REDIRECT_URI
//   ) {
//     console.error('Missing Spotify environment variables');
//     return NextResponse.json(
//       { error: 'Server configuration error: missing environment variables' },
//       { status: 500 }
//     );
//   }

//   const clientId = process.env.SPOTIFY_CLIENT_ID!;
//   const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
//   const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

//   // 토큰 요청 바디
//   const body = new URLSearchParams({
//     grant_type: 'authorization_code',
//     code,
//     redirect_uri: redirectUri,
//   });

//   const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
//     'base64'
//   );

//   try {
//     const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Basic ${basicAuth}`,
//       },
//       body: body.toString(),
//     });

//     if (!tokenRes.ok) {
//       const error = await tokenRes.json();
//       return NextResponse.json({ error }, { status: tokenRes.status });
//     }

//     const data = await tokenRes.json();
//     const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
//     const response = NextResponse.redirect(`${baseUrl}/`);

//     response.cookies.set('access_token', data.access_token, {
//       httpOnly: true,
//       sameSite: 'lax',
//       path: '/',
//       secure: process.env.NODE_ENV === 'production' ? true : false,
//       maxAge: data.expires_in || 3600,
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch token' },
//       { status: 500 }
//     );
//   }
// }
