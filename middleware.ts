import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// JWT 미들웨어
export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/api/auth/');

  if (!token && !isAuthPage) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error('JWT secret is not defined');
      jwt.verify(token, secret);
    } catch (error) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        console.error('JWT verification failed:', error);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
