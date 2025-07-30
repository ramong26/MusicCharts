'use client';

import { useEffect, useState } from 'react';
import { MUSIC_GENRES } from '@/shared/constants/musicGenres';

export default function RecommendList({ tag }: { tag?: string }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch(`/api/track-view/track-get`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    }

    fetchRecommendations();
  }, [tag]);

  console.log('Recommendations:', recommendations);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Recommended for You</h2>
      <p className="text-gray-600">위 카드를 클릭하면 추천 리스트를 볼 수 있어요!</p>
      {/* 리스트 출력 추가 */}
    </div>
  );
}
