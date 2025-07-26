import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();
    if (!text || !targetLang) {
      return new Response('텍스트와 언어가 있어야 합니다', { status: 400 });
    }

    const googleApiKey = process.env.GOOGLE_API_KEY;
    if (!googleApiKey) {
      console.error('GOOGLE_API_KEY is not set in environment variables.');
      throw new Error('API key is missing');
    }
    const genAI = new GoogleGenAI({
      apiKey: googleApiKey,
    });

    const prompt = `Translate the following text to ${targetLang}:\n\n${text}`;

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
    return new Response(JSON.stringify({ summary: resultText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Translation error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
