import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongo/mongo';
import { TracksView } from '@/lib/mongo/models/TrackView';

export async function POST(req: NextRequest) {
  const { trackId, genres, userId, guestId } = await req.json();

  if (!trackId || !genres || (!userId && !guestId)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await connectToDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cashedUserTrackViews = await TracksView.findOne({
    trackId,
    timestamp: { $gte: today },
    ...(userId ? { userId } : { guestId }),
  });

  if (cashedUserTrackViews) {
    return NextResponse.json({ message: 'Already logged today' }, { status: 200 });
  }

  const newView = new TracksView({
    trackId,
    genre: genres,
    userId: userId ?? null,
    guestId: guestId ?? null,
    timestamp: new Date(),
  });

  await newView.save();

  return NextResponse.json({ message: 'Logged successfully' }, { status: 201 });
}
