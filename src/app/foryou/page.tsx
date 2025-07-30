import HeaderMain from '@/shared/components/HeaderMain';
import TodayMusic from '@/features/foryou/components/TodayMusic';

export default function Foryou() {
  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex flex-col mt-[200px] gap-4 h-screen w-[1043px] mx-auto">
        <TodayMusic />
      </main>
    </div>
  );
}
