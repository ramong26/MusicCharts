import { getBaseUrl } from '@/lib/utils/baseUrl';
// 서버 전용
export async function translateTextServer(text: string, targetLang = 'ko'): Promise<string> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/gemini-api/translateText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang }),
  });

  if (!res.ok) {
    throw new Error('Translation failed');
  }

  const data = await res.json();
  return data.summary || '';
}
