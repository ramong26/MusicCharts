import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    if (!apiKey) {
      console.error('Gemini_AI_API_KEY is not set in environment variables.');
      throw new Error('Server is not configured to handle this request.');
    }

    const prompt = `
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
Only include real existing links. Do not make up data.`;
    const response = await apiKey.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    const resultText = response.text ?? '';
    return NextResponse.json({ result: resultText.trim() });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: 'Gemini API 호출 실패', detail: err.message },
      { status: 500 }
    );
  }
}
