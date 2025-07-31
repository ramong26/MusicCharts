'use client';

import { useRef, useState } from 'react';

import RecommandList from '@/features/foryou/components/RecommendList';
import useUserStore from '@/stores/userStore';
import MoodTag from '@/shared/components/MoodTag';
import { Icon } from '@/shared/components/IconsComponet';

export default function TodayMusic() {
  const moodTagRef = useRef<HTMLDivElement>(null);
  const [choicedTag, setChoicedTag] = useState<string>('Chill');
  const { user } = useUserStore();
  const isLoggedIn = !!user;

  const moodTags = ['Chill', 'HipHop', 'Jazz', 'Pop', 'K-Pop', 'Rock', 'Classical'];

  // 화살표 클릭 핸들러
  const handleArrowClick = (direction: 'left' | 'right') => {
    if (!moodTagRef.current) return;

    const scrollAmount = 1000;
    const currentScroll = moodTagRef.current.scrollLeft;

    if (direction === 'left') {
      moodTagRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth',
      });
    } else {
      moodTagRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleTagClick = (tag: string) => {
    setChoicedTag(tag);
  };
  return (
    <>
      {!isLoggedIn ? (
        <>
          <span className=" text-4xl font-extrabold"> Hello, </span>
          <span className=" text-4xl font-extrabold text-beige-deep-dark">Guest!</span>
        </>
      ) : (
        <p className=" text-4xl font-extrabold pt-10">
          <span className=" text-4xl font-extrabold"> Hello, </span>
          <span className=" text-4xl font-extrabold text-beige-deep-dark">
            {user?.displayName}!
          </span>
        </p>
      )}
      <div className="flex items-center justify-between flex-row">
        <span className="text-3xl font-semibold ">오늘은 이 음악 어때요? 유명한 곡들이에요!</span>
        <div className="flex items-center justify-center gap-2">
          <Icon
            name="ArrowButton"
            size={40}
            className="origin-center transform translate-y-[-3px] cursor-pointer hover:scale-110 transition-all text-center flex items-center justify-center text-black hover:text-[#cccccc]"
            color="currentColor"
            onClick={() => handleArrowClick('left')}
          />
          <Icon
            name="ArrowButton"
            size={40}
            className="rotate-180 transform cursor-pointer hover:scale-110 transition-all flex items-center justify-center text-black hover:text-[#cccccc]"
            color="currentColor"
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div>
        <div className="flex gap-4 overflow-auto scrollbar-hide" ref={moodTagRef}>
          {moodTags.map((tag) => (
            <MoodTag key={tag} tag={tag} onClick={() => handleTagClick(tag)} />
          ))}
        </div>
      </div>
      <RecommandList tag={choicedTag} />
    </>
  );
}
