/// eslint-disable-next-line react-hooks/exhaustive-deps
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import useUserStore from '@/stores/userStore';

import HeaderSort from '@/public/image/header-sort.png';

interface SpotifyProfile {
  name: string;
  imageUrl?: string;
}
export default function HeaderMain() {
  const [isScroll, setIsScroll] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);

  const { setUser } = useUserStore();

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setUser]);

  // 로그인 및 프로필 확인
  useEffect(() => {
    fetch('/api/profile', { credentials: 'include', cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('로그인 안 됨');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setIsLogin(true);
        setUser({
          ...data,
          _id: data.id,
        });
      })
      .catch(() => {
        setProfile(null);
        setIsLogin(false);
      });
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      credentials: 'include',
    });

    window.location.href = '/';
  };

  return (
    <header className="w-full bg-[rgba(18,18,18)] backdrop-blur-md text-amber-50 flex items-center justify-between flex-col transition-all duration-300 shadow-lg fixed top-0 left-0 right-0 z-999">
      {/* 상단: 로고 및 로그인 상태 */}
      {!isScroll && (
        <div className="flex items-center justify-between w-full h-fit p-7">
          <Image src={HeaderSort} alt="Header Sort" width={24} height={24} />
          <div className="cursor-pointer">
            <Link href="/">로고</Link>
          </div>
          {!isLogin && <Link href="/login">로그인</Link>}
          {isLogin && profile && (
            <div className="cursor-pointer">
              <Link
                href="/profile"
                className="cursor-pointer text-sm font-semibold  flex items-center"
              >
                {profile.imageUrl && (
                  <Image
                    src={profile.imageUrl}
                    alt="Profile Image"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                )}
                {profile.name}
              </Link>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )}
        </div>
      )}

      {/* 하단: 메뉴 */}
      <div className="flex items-center justify-between w-full h-fit p-7 transition-all duration-300">
        <div>검색 input</div>
        <div className="flex gap-[100px] font-bold text-2xl">
          <Link href="/charts">chart</Link>
          <Link href="/playlist">playlist</Link>
          <Link href="/channel">channel</Link>
          <Link href="/foryou">for you</Link>
        </div>
        {isScroll && (
          <div className="flex items-center">
            {!isLogin ? (
              <Link href="/login" className="cursor-pointer text-sm">
                로그인
              </Link>
            ) : (
              profile && (
                <div className="cursor-pointer">
                  <Link href="/profile" className="text-sm font-semibold">
                    환영합니다, {profile.name}님!
                  </Link>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              )
            )}
          </div>
        )}
        {!isScroll && <div></div>}
      </div>
    </header>
  );
}
