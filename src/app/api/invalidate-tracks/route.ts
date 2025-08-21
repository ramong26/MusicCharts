import { NextResponse } from 'next/server';
import redis from '@/lib/redis/redis';

export async function GET() {
  const stream = redis.scanStream({ match: 'track:*' });
  for await (const keys of stream) {
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }
  return NextResponse.json({ success: true });
}
