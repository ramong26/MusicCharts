import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const googleApiKey = process.env.GOOGLE_API_KEY;
    if (!googleApiKey) {
      console.error('GOOGLE_API_KEY is not set in environment variables.');
      throw new Error('Server is not configured to handle this request.');
    }
    const genAI = new GoogleGenAI({
      apiKey: googleApiKey,
    });

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
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const resultText = response.text ?? '';
    let parsedResult = [];
    try {
      const jsonString = resultText
        .trim()
        .replace(/^```json\s*/, '')
        .replace(/```$/, '');

      const trimmedJsonString = jsonString.trim();
      if (jsonString && (trimmedJsonString.startsWith('{') || trimmedJsonString.startsWith('['))) {
        parsedResult = JSON.parse(trimmedJsonString);
      } else {
        parsedResult = [];
      }
    } catch (e) {
      parsedResult = [];
      console.error('Failed to parse JSON from Gemini response:', e, 'Raw response:', resultText);
    }
    return NextResponse.json({ result: parsedResult });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: 'Gemini API 호출 실패', detail: err.message },
      { status: 500 }
    );
  }
}
