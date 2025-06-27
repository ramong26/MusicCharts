"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import HeaderSort from "../../../public/image/header-sort.png";

export default function HeaderMain() {
  const [isScroll, setIsScroll] = useState(false);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full bg-[rgba(18,18,18)] backdrop-blur-md text-amber-50 flex items-center justify-between flex-col transition-all duration-300 shadow-lg fixed top-0 left-0 right-0 z-999">
      {!isScroll && (
        <div className=" flex items-center justify-between w-full h-fit p-7">
          <Image src={HeaderSort} alt="Header Sort" width={24} height={24} />
          <div className="cursor-pointer">
            <Link href={"/"}>로고</Link>
          </div>
          <button className="cursor-pointer">로그인</button>
        </div>
      )}

      <div className="flex items-center justify-between w-full h-fit p-7 transition-all duration-300">
        <div>검색 input</div>
        <div className="flex gap-[100px] font-bold text-2xl">
          <Link href={"/charts"}>chart</Link>
          <Link href={"/playlist"}>playlist</Link>
          <Link href={"/channel"}>channel</Link>
          <Link href={"/interview"}>interview</Link>
        </div>
        {isScroll && (
          <div className="flex items-center">
            <button className="cursor-pointer">로그인</button>
          </div>
        )}
        {!isScroll && <div>{}</div>}
      </div>
    </header>
  );
}
