'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import useUserStore from '@/stores/userStore';

import HeaderSort from '@/public/image/header-sort.png';
import DefaultProfile from '@/public/image/default-profile-image.avif';
const LoginModal = dynamic(() => import('@/features/auth/components/LoginModal'), {
  ssr: false,
});
const SignupModal = dynamic(() => import('@/features/auth/components/SignupModal'), {
  ssr: false,
});

interface Profile {
  displayName: string;
  profileImageUrl?: string | null;
}

export default function HeaderMain() {
  const [isScroll, setIsScroll] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);

  const { setUser } = useUserStore();

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 로그인 상태 확인
  useEffect(() => {
    fetch('/api/profile', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    })
      .then((res) => {
        if (!res.ok) throw new Error('로그인 안 됨');
        return res.json();
      })
      .then((data) => {
        const profileImage = data.profileImageUrl || DefaultProfile;
        setProfile({ ...data, profileImageUrl: profileImage });
        setIsLogin(true);
        setUser({ ...data, _id: data.id, profileImageUrl: profileImage });
      })
      .catch(() => {
        setProfile(null);
        setIsLogin(false);
      });
  }, [setUser]);

  // 로그아웃 처리
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { credentials: 'include' });
    window.location.href = '/';
  };

  // 모달 열기 처리
  const handleOpenModal = (type: 'login' | 'signup') => {
    setModalType(type);
    document.body.style.overflow = 'hidden';
  };

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

      {/* 모달 */}
      {modalType === 'login' && (
        <LoginModal
          onClose={() => {
            setModalType(null);
            document.body.style.overflow = 'auto';
          }}
          onChangeModal={(type) => setModalType(type)}
        />
      )}

      {modalType === 'signup' && (
        <SignupModal
          onClose={() => {
            setModalType(null);
            document.body.style.overflow = 'auto';
          }}
          onChangeModal={(type) => setModalType(type)}
        />
      )}
    </>
  );
}
