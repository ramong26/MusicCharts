import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();
    if (!text || !targetLang) {
      return new Response('텍스트와 언어가 있어야 합니다', { status: 400 });
    }

    const apiKey = process.env.OPEN_AI_API_KEY;
    if (!apiKey) {
      return new Response('API key is missing', { status: 500 });
    }

    const openai = new OpenAI({
      apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that translates text to ${targetLang}.`,
        },
        {
          role: 'user',
          content: `Translate the following text to ${targetLang}:\n\n${text}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const summaryTranslated = completion.choices?.[0].message?.content ?? '';

    return new Response(JSON.stringify({ summary: summaryTranslated }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Translation error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
