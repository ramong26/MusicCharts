import Link from 'next/link';
import Image from 'next/image';

import HeaderSort from '@/public/image/header-sort.png';

interface Profile {
  displayName: string;
  profileImageUrl?: string | null;
}

interface HeaderLayoutProps {
  handleOpenModal: (type: 'login' | 'signup') => void;
  handleLogout: () => void;
  profile: Profile | null;
  isLogin: boolean;
  isScroll: boolean;
}

export default function HeaderLayout({
  handleOpenModal,
  handleLogout,
  profile,
  isLogin,
  isScroll,
}: HeaderLayoutProps) {
  const renderAuthButtons = () => (
    <div className="flex gap-4 text-sm font-semibold">
      <button className="cursor-pointer" onClick={() => handleOpenModal('login')}>
        로그인
      </button>
      <button className="cursor-pointer" onClick={() => handleOpenModal('signup')}>
        회원가입
      </button>
    </div>
  );

  const renderProfile = () =>
    profile && (
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Link href="/profile" className="flex items-center gap-2">
          {profile.profileImageUrl && (
            <Image
              src={profile.profileImageUrl}
              alt="Profile"
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          {profile.displayName}
        </Link>
        <button className="cursor-pointer" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    );

  return (
    <>
      <header className="w-full bg-[rgba(18,18,18)] backdrop-blur-md text-amber-50 fixed top-0 left-0 right-0 z-999 shadow-lg transition-all duration-300">
        {/* 상단 영역 */}
        {!isScroll && (
          <div className="flex items-center justify-between w-full h-fit p-7">
            <Image src={HeaderSort} alt="Header Sort" width={24} height={24} />
            <Link className="text-4xl cursor-pointer" href="/">
              Soundtalk
            </Link>
            {isLogin ? renderProfile() : renderAuthButtons()}
          </div>
        )}

        {/* 메뉴 영역 */}
        <div className="flex items-center justify-between w-full h-fit p-7 transition-all duration-300">
          <div>검색 input</div>
          <div className="flex gap-[100px] font-bold text-2xl">
            <Link href="/charts">chart</Link>
            <Link href="/playlist">playlist</Link>
            <Link href="/channel">channel</Link>
            <Link href="/recommend">recommend</Link>
          </div>
          {isScroll && <div>{isLogin ? renderProfile() : renderAuthButtons()}</div>}
          {!isScroll && <div />}
        </div>
      </header>
    </>
  );
}
