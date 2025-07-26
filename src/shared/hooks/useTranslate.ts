'use client';

import { useState, useCallback } from 'react';

// 클라이언트 전용
export default function useTranslate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translateText = useCallback(async (text: string, targetLang = 'ko'): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini-api/translateText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang }),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || 'Translation failed');
      }

      const data = await res.json();
      return data.summary || '';
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      return '';
    } finally {
      setLoading(false);
    }
  }, []);

  return { translateText, loading, error };
}
