import Link from 'next/link';
import Image from 'next/image';

interface Profile {
  displayName: string;
  profileImageUrl?: string | null;
}

interface HeaderLayoutProps {
  handleOpenModal: (type: 'login' | 'signup') => void;
  handleLogout: () => void;
  profile: Profile | null;
  isLogin: boolean;
}

export default function HeaderLayout({
  handleOpenModal,
  handleLogout,
  profile,
  isLogin,
}: HeaderLayoutProps) {
  const renderAuthButtons = () => (
    <div className="text-xl font-bold flex gap-[30px] items-center justify-between h-full">
      <button className="cursor-pointer" onClick={() => handleOpenModal('login')}>
        SIGNIN
      </button>
      <button className="cursor-pointer" onClick={() => handleOpenModal('signup')}>
        SIGNUP
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
    <div className="flex w-full justify-between px-[30px] h-[70px] bg-white">
      <div className="text-xl font-bold flex gap-[30px] items-center justify-between">
        <Link href="/charts">CHART</Link>
        <Link href="/playlist">PLAYLIST</Link>
        <Link href="/channel">CHANNEL</Link>
        <Link href="/recommend">RECOMMEND</Link>
      </div>
      <div className="text-2xl font-extrabold flex items-center">SOUNDTALK</div>
      <div className="h-full">
        <div className="h-full">{isLogin ? renderProfile() : renderAuthButtons()}</div>
      </div>
    </div>
  );
}
