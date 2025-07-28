export const dynamic = 'force-dynamic';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongo/mongo';
import { UserModel } from '@/lib/mongo/models/UserModel';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  // JWT 쿠키 가져오기
  const token = req.cookies.get('jwt')?.value;
  console.log('JWT:', token);
  if (!token) {
    return NextResponse.json({ error: 'JWT not found' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    console.log('✅ Decoded:', decoded);
    await connectToDB();

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log('👤 User:', user);
    return NextResponse.json({
      displayName: user.displayName,
      profileImageUrl: user.profileImageUrl || null,
      id: user._id.toString(),
    });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
