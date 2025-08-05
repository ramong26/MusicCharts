import { NextResponse } from 'next/server';

import { getGoogleRedirectUri } from '@/lib/utils/baseUrl';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = getGoogleRedirectUri();
  const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' ');

  const authUrl = 'https://accounts.google.com/o/oauth2/auth';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId ?? '',
    redirect_uri: redirectUri,
    scope: scope,
    access_type: 'offline',
    prompt: 'consent',
  });

  const loginUrl = `${authUrl}?${params.toString()}`;
  return NextResponse.redirect(loginUrl);
}
