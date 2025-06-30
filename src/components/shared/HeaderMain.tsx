"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  fetchSpotifyProfile,
  SpotifyProfile,
} from "@/features/loginSignup/login/hooks/fetchSpotifyProfile";
import HeaderSort from "../../../public/image/header-sort.png";

export default function HeaderMain() {
  const [isScroll, setIsScroll] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 로그인 및 프로필 확인
  // access_token이 쿼리스트링으로 넘어온 경우 localStorage에 저장
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("access_token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // 컴포넌트 마운트 시 프로필 로드
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLogin(true);
    fetchSpotifyProfile(token)
      .then((data) => setProfile(data))
      .catch((err) => {
        console.error("프로필 로드 실패:", err);
        setIsLogin(false);
      });
  }, []);

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
            <Link
              href="/profile"
              className="cursor-pointer text-sm font-semibold"
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
          <Link href="/interview">interview</Link>
        </div>
        {isScroll && (
          <div className="flex items-center">
            {!isLogin ? (
              <Link href="/login" className="cursor-pointer text-sm">
                로그인
              </Link>
            ) : (
              profile && (
                <Link href="/profile" className="text-sm font-semibold">
                  환영합니다, {profile.name}님!
                </Link>
              )
            )}
          </div>
        )}
        {!isScroll && <div></div>}
      </div>
    </header>
  );
}
