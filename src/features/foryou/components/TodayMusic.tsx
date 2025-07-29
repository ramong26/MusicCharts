'use client';

import useUserStore from '@/stores/userStore';
import MoodTag from '@/shared/components/MoodTag';

export default function TodayMusic() {
  const { user } = useUserStore();
  const isLoggedIn = !!user;

  const moodTags = ['chill', 'dreamy', 'energetic'];
  return (
    <>
      <div className="border-b border-gray-300 pb-2 mb-3">
        {!isLoggedIn ? (
          <p className="text-gray-500 text-2xl">👤 안녕하세요, 게스트님</p>
        ) : (
          <>
            <p className="text-gray-500 text-2xl">
              👤 안녕하세요, <strong>{user?.displayName}</strong>님
            </p>
            <p>오늘 이런 음악 어때요?</p>
          </>
        )}
      </div>

      <div>
        <p>🎧 추천 무드 태그:</p>
        <div className="flex gap-4">
          {moodTags.map((tag) => (
            <MoodTag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </>
  );
}
