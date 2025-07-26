import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();
    if (!text || !targetLang) {
      return new Response('텍스트와 언어가 있어야 합니다', { status: 400 });
    }

    const apiKey = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    if (!apiKey) {
      return new Response('API key is missing', { status: 500 });
    }

    const prompt = `Translate the following text to ${targetLang}:\n\n${text}`;

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
    return new Response(JSON.stringify({ summary: resultText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Translation error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
