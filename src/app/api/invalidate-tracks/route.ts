import { NextResponse } from 'next/server';
import redis from '@/lib/redis/redis';

export async function GET() {
  const keys = await redis.keys('track:*');
  if (keys.length > 0) {
    await redis.del(keys);
  }
  return NextResponse.json({ success: true });
}
