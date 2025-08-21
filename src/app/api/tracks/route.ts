import { NextRequest, NextResponse } from 'next/server';

import redis from '@/lib/redis/redis';

const ONE_DAY = 86400;
interface PageProps {
  params: Promise<{ id: string }>;
}
export async function GET(request: NextRequest, { params }: PageProps) {
  const { id } = await params;
  const cachedKey = `track:${id}`;

  const cached = await redis.get(cachedKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached), { headers: { 'x-cache': 'HIT' } }); // 데이터 이미 저장
  }

  const res = await fetch(`https://music-charts.vercel.app/tracks/${id}`);
  if (!res.ok) return NextResponse.error();
  const data = await res.json();

  await redis.set(cachedKey, JSON.stringify(data), 'EX', ONE_DAY);
  return NextResponse.json(data, { headers: { 'x-cache': 'MISS' } }); // 저장된 데이터가 캐시에 없음 -> 새로 가져와서 응답
}
