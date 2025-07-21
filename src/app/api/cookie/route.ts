import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('jwt')?.value;
  if (!cookie) {
    return new Response('JWT not found', { status: 401 });
  }
  return NextResponse.json(
    { jwt: cookie },
    {
      status: 200,
    }
  );
}
