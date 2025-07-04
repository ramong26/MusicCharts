import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect('/');
  response.cookies.set({
    name: 'access_token',
    value: '',
    maxAge: 0,
    path: 'http://127.0.0.1:3000/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
