import HeaderMain from '@/shared/components/HeaderMain';
import TodayMusic from '@/features/recommend/components/TodayMusic';

export default function Recommend() {
  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex flex-col mt-[200px] gap-4 h-screen w-[1043px] mx-auto">
        <TodayMusic />
      </main>
    </div>
  );
}
