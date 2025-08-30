import TodayMusic from '@/features/recommend/components/TodayMusic';

export const metadata = {
  title: 'Music Recommendation',
  description: 'Discover new music tailored for you',
};

export const revalidate = 86400;

export default function Recommend() {
  return (
    <div className="h-screen ">
      <main className="flex flex-col mt-[200px] gap-4 h-screen w-[1043px] mx-auto">
        <TodayMusic />
      </main>
    </div>
  );
}
