import { NextResponse } from 'next/server';

import { getRedirectUri } from '@/lib/utils/baseUrl';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = getRedirectUri();

  const scope = [
    'user-read-private',
    'user-read-email',
    'streaming',
    'user-read-playback-state',
    'user-modify-playback-state',
  ].join(' ');

  const authUrl = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId || '',
    redirect_uri: redirectUri || '',
    scope: scope || '',
  });

  const loginUrl = `${authUrl}?${params.toString()}`;
  return NextResponse.redirect(loginUrl);
}
