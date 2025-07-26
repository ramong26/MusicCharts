import { NextResponse } from 'next/server';
import getArtist from '@/features/tracks/hooks/getArtist';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const artist = await getArtist(params.id);
    return NextResponse.json(artist);
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
