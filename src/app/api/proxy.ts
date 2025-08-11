import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://music-charts.vercel.app/api', {
    headers: {
      Authorization: `Bearer ${process.env.MY_API_TOKEN}`,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
