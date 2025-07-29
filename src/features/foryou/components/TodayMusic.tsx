'use client';
import useUserStore from '@/stores/userStore';

export default function TodayMusic() {
  const { user } = useUserStore();
  console.log(user);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">안녕하세요 {user?.displayName}님</h2>
      <p className="text-gray-600">오늘 이런 음악 어때요?</p>
    </div>
  );
}
