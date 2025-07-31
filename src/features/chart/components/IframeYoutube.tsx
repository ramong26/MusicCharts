'use client';

import { useState } from 'react';

interface IframePlayerProps {
  videoId: string;
}
export default function IframeYoutube({ videoId }: IframePlayerProps) {
  const [hasError, setHasError] = useState(false);

  const handleIframeError = () => {
    console.error(`YouTube iframe error for video ID: ${videoId}`);
    setHasError(true);
  };

  if (hasError) {
    return <div>⚠️ 영상이 삭제되었거나 사용할 수 없습니다.</div>;
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/zzKV_T9ybe8`}
      width="958"
      height="500"
      frameBorder="0"
      allowFullScreen
      onError={handleIframeError}
    />
  );
}
