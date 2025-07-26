import { NextResponse, NextRequest } from 'next/server';
import getArtist from '@/features/tracks/hooks/getArtist';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  try {
    const artist = await getArtist(id);
    return NextResponse.json(artist);
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
