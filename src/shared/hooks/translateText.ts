import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export default async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  const prompt = `Translate the following text to ${targetLang}:\n\n${text}`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return completion.choices[0].message.content ?? '';
}
