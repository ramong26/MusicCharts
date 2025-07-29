import HeaderMain from '@/shared/components/HeaderMain';
import TodayMusic from '@/features/foryou/components/TodayMusic';
import RecommandList from '@/features/foryou/components/RecommendList';

export default function Foryou() {
  return (
    <div className="h-screen ">
      <HeaderMain />
      <main className="flex flex-col mt-[193px] gap-4 h-screen w-[1043px] mx-auto">
        <TodayMusic />
        <RecommandList />
      </main>
    </div>
  );
}
