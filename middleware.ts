import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// JWT 미들웨어
export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/');
  const isAuthPage = request.nextUrl.pathname.startsWith('/api/auth/');
  if (isApiRequest && !token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
