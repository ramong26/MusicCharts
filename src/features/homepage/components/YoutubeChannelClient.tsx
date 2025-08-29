'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { YouTubeChannel } from '@/shared/types/youtube';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function YoutubeChannels({ channels }: { channels: YouTubeChannel[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [activeCenter, setActiveCenter] = useState(false);
  const [balls, setBalls] = useState<Ball[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 초기 위치/속도 세팅
  useEffect(() => {
    const initialBalls = channels.map(() => ({
      x: Math.random() * 1200 - 300,
      y: Math.random() * 400 - 200,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setBalls(initialBalls);
  }, [channels]);

  // 애니메이션 루프
  useEffect(() => {
    let animationFrame: number;

    const update = () => {
      setBalls((prev) =>
        prev.map((ball) => {
          let { x, y, vx, vy } = ball;

          if (activeCenter) {
            const dx = x;
            const dy = y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 2;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }

          x += vx * 2;
          y += vy * 2;

          const maxX = 900;
          const maxY = 250;

          if (x > maxX || x < -maxX) vx *= -1;
          if (y > maxY || y < -maxY) vy *= -1;

          return {
            x: Math.max(-maxX, Math.min(x, maxX)),
            y: Math.max(-maxY, Math.min(y, maxY)),
            vx: vx * 0.98,
            vy: vy * 0.98,
          };
        })
      );
      animationFrame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrame);
  }, [activeCenter]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[700px] flex items-center justify-center bg-rose-500 overflow-hidden"
    >
      {/* 중앙 텍스트 */}
      <div
        className="absolute text-center z-20"
        onMouseEnter={() => setActiveCenter(true)}
        onMouseLeave={() => setActiveCenter(false)}
      >
        {active !== null ? (
          <>
            <h2
              className="font-bold text-3xl text-white"
              style={{
                textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
              }}
            >
              {channels?.[active]?.snippet?.title}
            </h2>
            <p
              className="text-xl mt-2 max-w-sm text-white"
              style={{
                textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
              }}
            >
              {channels?.[active]?.snippet?.description}
            </p>
            <p
              className="text-lg mt-1 text-white"
              style={{
                textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
              }}
            >
              구독자 {channels?.[active]?.statistics?.subscriberCount}명 · 영상{' '}
              {channels?.[active]?.statistics?.videoCount}개
            </p>
          </>
        ) : (
          <h2
            className="text-4xl font-extrabold text-white hover:cursor-pointer hover:transition-transform hover:scale-105"
            style={{
              textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000',
            }}
          >
            Recommended Playlists
          </h2>
        )}
      </div>

      {/* 원형 아이콘들 */}
      {channels.map((channel, idx) => (
        <motion.div
          key={idx}
          className="absolute w-32 h-32 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-lg"
          animate={{
            x: balls[idx]?.x || 0,
            y: balls[idx]?.y || 0,
          }}
          transition={{ type: 'tween', duration: 0.1 }}
          whileHover={{ scale: 1.2, zIndex: 30 }}
          onHoverStart={() => setActive(idx)}
          onHoverEnd={() => setActive(null)}
        >
          <Link href={`https://www.youtube.com/${channel.snippet?.customUrl}`}>
            <Image
              src={channel.snippet.thumbnails.default.url || channel.snippet.thumbnails.medium.url}
              alt={channel.snippet.title}
              width={96}
              height={96}
              className="rounded-full"
            />
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
