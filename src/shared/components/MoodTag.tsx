import React from 'react';

interface MoodTagProps {
  tag: string;
}

export default function MoodTag({ tag }: MoodTagProps) {
  return (
    <div className="flex items-center justify-center flex-col w-fit h-fit">
      <div className="group w-[300px] h-[150px] cursor-pointer bg-beige-light hover:bg-beige-medium transition-colors rounded"></div>
      <span className="text-lg font-semibold w-full h-full inline-flex items-center justify-center text-center">
        {tag}
      </span>
    </div>
  );
}
