'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

import { Track } from '@/shared/types/SpotifyTrack';
import { getSpotifyUserAccessToken } from '@/shared/hooks/getSpotifyUserToken';

export default function Miniplayer({ track }: { track: Track }) {
  const [paused, setPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Spotify Player 핸들
  const initializePlayer = async () => {
    const accessToken = await getSpotifyUserAccessToken();

    if (!accessToken) {
      alert('Spotify 프리미엄 계정이 필요합니다.');
      return;
    }

    if (!window.Spotify && !document.getElementById('spotify-sdk')) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      await new Promise<void>((resolve) => {
        window.onSpotifyWebPlaybackSDKReady = () => resolve();
      });
    }

    const spotifyPlayer = new Spotify.Player({
      name: 'Web Playback SDK',
      getOAuthToken: (cb) => cb(accessToken),
      volume: 0.5,
    });

    spotifyPlayer.addListener('ready', ({ device_id }) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [`spotify:track:${track.id}`],
        }),
      }).catch(console.error);
    });

    spotifyPlayer.addListener('player_state_changed', (state) => {
      if (!state) return;
      setPaused(state.paused);
      setCurrentTrack(state.track_window.current_track as unknown as Track);
    });

    spotifyPlayer.connect();
    setPlayer(spotifyPlayer);
    setInitialized(true);
  };

  // 재생/일시정지 핸들
  const handlePlayClick = () => {
    if (!initialized) {
      initializePlayer();
    } else {
      player?.togglePlay();
    }
  };

  // 컴포넌트 언마운트 시 플레이어 연결 해제
  useEffect(() => {
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [player]);
  return (
    <div className="w-full bg-black text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={currentTrack?.album?.images[1]?.url}
          alt="Album Art"
          className="mr-4"
          width={50}
          height={50}
        />
        <div className="flex flex-row items-center space-x-2 justify-center gap-5">
          <h3 className="text-2xl font-semibold">{currentTrack?.name}</h3>
          <p className="text-xl text-gray-400">{currentTrack?.artists[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handlePlayClick}
          className="cursor-pointer w-12 h-12 flex items-center justify-center text-white bg-green-500 p-2 rounded-full hover:bg-green-600"
        >
          {paused ? <FaPlay className="w-6 h-6" /> : <FaPause className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
