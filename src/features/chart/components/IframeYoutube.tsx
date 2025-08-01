'use client';

import { useEffect, useState } from 'react';
import { TrackItem } from '@/shared/types/SpotifyTrack';
import { getYoutubeTrackFetchVideo } from '@/features/tracks/hooks/getYoutube';
import { checkIfEmbeddable, getYoutubeEmbedFallback } from '@/shared/hooks/checkIfEmbeddable';

interface Props {
  tracksList: TrackItem[];
}

export default function IframeYoutube({ tracksList }: Props) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVideo() {
      if (!tracksList || tracksList.length === 0) return;

      const getQuery = (trackItem: TrackItem) =>
        `${trackItem.track.artists[0].name} ${trackItem.track.name} official music video`;
      const query = getQuery(tracksList[0]);

      const searchResults = await getYoutubeTrackFetchVideo(query);
      if (!searchResults || searchResults.length === 0) {
        setError(true);
        return;
      }

      const primaryId = searchResults[0].videoId;
      const embeddable = await checkIfEmbeddable(primaryId);

      if (embeddable) {
        setVideoId(primaryId);
      } else {
        // fallback: 대체 가능한 영상 찾기
        const fallbackId = await getYoutubeEmbedFallback(
          tracksList[0].track.artists[0].name,
          tracksList[0].track.album.name
        );

        if (fallbackId) {
          setVideoId(fallbackId);
        } else {
          setError(true);
        }
      }
    }

    fetchVideo();
  }, [tracksList]);

  if (error || !videoId) {
    if (!tracksList || tracksList.length === 0) {
      return <div>⚠️ 트랙 정보가 없습니다.</div>;
    }
    return (
      <div>
        ⚠️ 유튜브에서 영상이 재생되지 않습니다. <br />
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            tracksList[0].track.artists[0].name +
              ' ' +
              tracksList[0].track.name +
              ' official music video'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          YouTube에서 직접 보기
        </a>
      </div>
    );
  }

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
