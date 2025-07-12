import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.OPEN_AI_API_KEY;
    if (!apiKey) {
      console.error('OPEN_AI_API_KEY is not set in environment variables.');
      throw new Error('Server is not configured to handle this request.');
    }
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
Search the internet and provide a list of 3 to 5 recent interviews of the artist "${query}".
Return the data in clean JSON format as an array like:
[
  {
    "title": "...",
    "link": "...",
    "source": "..."
  },
  ...
]
Only include real existing links. Do not make up data.`,
        },
        {
          role: 'user',
          content: `Find recent artist interviews for "${query}".`,
        },
      ],
    });

    const content = completion.choices[0].message?.content || '';
    let parsed = [];

    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error('JSON 파싱 실패:', content);
    }

    return NextResponse.json({ result: parsed });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: 'OpenAI API 호출 실패', detail: err.message },
      { status: 500 }
    );
  }
}
