// import { NextRequest, NextResponse } from 'next/server';
// import connectToDB from '@/lib/mongo/mongo';
// import { TracksView } from '@/lib/mongo/models/TrackView';

// export async function GET(req: NextRequest) {
//   await connectToDB();

//   const token = req.cookies.get('jwt')?.value;
//   if (!token) {
//     const searchParams = new URL(req.url).searchParams;
//     const guestId = searchParams.get('guestId');
//     if (!guestId) {
//       return NextResponse.json({ error: 'Guest ID is required' }, { status: 400 });
//     }
//     const trackViews = await TracksView.find({ guestId }).sort({ timestamp: -1 }).limit(10);

//     return NextResponse.json(trackViews, { status: 200 });
//   }
// }

//post랑 get을 같이 할 수 있지 않을까
