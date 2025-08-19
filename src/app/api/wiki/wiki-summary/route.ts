import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongo/mongo';
import { WikiSummary } from '@/lib/mongo/models/WikiSummary';
import { translateTextServer } from '@/shared/hooks/translateTextServer';

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title');
  if (!title) {
    return NextResponse.json({ error: 'No title provided' }, { status: 400 });
  }

  try {
    await connectToDB();

    const summaryDoc = await WikiSummary.findOne({ title });

    if (summaryDoc) {
      return NextResponse.json({
        extract: summaryDoc.extract_ko || summaryDoc.extract || 'No summary available (cached)',
      });
    }

    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );

    if (!response.ok) throw new Error('Summary not found');
    const data = await response.json();
    const translated = await translateTextServer(data.extract, 'ko');
    await WikiSummary.create({
      title,
      extract: data.extract,
      extract_ko: translated,
    });

    return NextResponse.json({ extract: translated || 'No summary available' });
  } catch (e) {
    console.error('Error fetching wiki summary:', e);
    return NextResponse.json({ extract: 'No summary available' }, { status: 500 });
  }
}
