import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code not found' },
      { status: 400 }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  });

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  );

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: body.toString(),
    });

    if (!tokenRes.ok) {
      const error = await tokenRes.json();
      return NextResponse.json({ error }, { status: tokenRes.status });
    }

    const data = await tokenRes.json();
    const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
    const response = NextResponse.redirect(`${baseUrl}/`);

    response.cookies.set('access_token', data.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production' ? true : false,

      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url); // 로그인 요청시 해당 서치파람즈 가져오기
//   const code = searchParams.get("code"); // authorization code를 가져옴

//   if (!code) {
//     return NextResponse.json(
//       { error: "Authorization code not found" },
//       { status: 400 }
//     );
//   }

//   const clientId = process.env.SPOTIFY_CLIENT_ID;
//   const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
//   const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

//   const body = new URLSearchParams({
//     grant_type: "authorization_code", // auth 2.0에서 사용하는 grant type authorization_code로 요청
//     code: code,
//     redirect_uri: redirectUri || "",
//   });

//   const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
//     "base64"
//   );

//   try {
//     const response = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${basicAuth}`,
//       },
//       body: body.toString(),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       return NextResponse.json({ error }, { status: response.status });
//     }

//     const data = await response.json();
//     const redirectUrl = new URL("/", request.url);
//     redirectUrl.searchParams.set("access_token", data.access_token);

//     return NextResponse.redirect(redirectUrl.toString());
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch token" },
//       { status: 500 }
//     );
//   }
// }
