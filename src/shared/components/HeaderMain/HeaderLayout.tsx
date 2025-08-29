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
    <div className="lg:text-xl md:text-lg text-sm font-bold flex lg:gap-[30px] md:gap-[15px] gap-[10px] items-center justify-between h-full ">
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
      <div className="flex items-center gap-2 text-lg font-semibold h-full">
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
          LOGOUT
        </button>
      </div>
    );

  return (
    <div className="flex w-full justify-between px-[30px] h-[70px] bg-white">
      <div className="lg:text-xl md:text-lg text-sm font-bold flex lg:gap-[20px] md:gap-[15px] gap-[10px] items-center justify-between">
        <Link href="/charts">CHART</Link>
        <Link href="/playlist">PLAYLIST</Link>
        <Link href="/channel">CHANNEL</Link>
        <Link href="/recommend">RECOMMEND</Link>
      </div>

      <Link href="/" className="lg:text-2xl md:text-lg font-extrabold flex items-center">
        SOUNDTALK
      </Link>
      <div className="h-full">
        <div className="h-full">{isLogin ? renderProfile() : renderAuthButtons()}</div>
      </div>
    </div>
  );
}
