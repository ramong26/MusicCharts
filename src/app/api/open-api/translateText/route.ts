import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    const apiKey = process.env.OPEN_AI_API_KEY;
    if (!apiKey) {
      return new Response('API key is missing', { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that translates text to Korean.',
        },
        {
          role: 'user',
          content: `Translate the following text to Korean:\n\n${text}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const summaryKorean = completion.choices[0].message?.content ?? '';

    return new Response(JSON.stringify({ summary: summaryKorean }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
