'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Track } from '@/shared/types/SpotifyTrack';

export default function Miniplayer({ track }: { track: Track }) {
  const [paused, setPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  // 리펙토링 할 필요가 있음
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('스포티파이 프리미엄 계정이 필요합니다.');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true; // 비동기 로딩
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });
      setPlayer(player);

      const onReady = ({ device_id }: { device_id: string }) => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: [`spotify:track:${track.id}`],
          }),
        }).catch(console.error);
      };

      const onPlayerStateChanged = (state: Spotify.PlaybackState | null) => {
        if (!state) return;
        setCurrentTrack(state.track_window.current_track as unknown as Track);
        setPaused(state.paused);
      };

      player.addListener('ready', onReady);
      player.addListener('player_state_changed', onPlayerStateChanged);

      player.connect();

      // 클린업 함수
      return () => {
        player.removeListener('ready', onReady);
        player.removeListener('player_state_changed', onPlayerStateChanged);
        player.disconnect();
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [track.id]);

  // 트랙과 플레이어가 변경될 때마다 플레이어에 트랙을 설정
  useEffect(() => {
    if (!player) return;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('스포티파이 프리미엄 계정이 필요합니다.');
      return;
    }

    const onReady = ({ device_id }: { device_id: string }) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [`spotify:track:${track.id}`],
        }),
      }).catch(console.error);
    };

    player.addListener('ready', onReady);

    // 클린업 함수
    return () => {
      player.removeListener('ready', onReady);
    };
  }, [track, player]);

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
          onClick={() => player?.togglePlay()}
          className="w-12 h-12 flex items-center justify-center text-white bg-green-500 p-2 rounded-full hover:bg-green-600"
        >
          {paused ? <FaPlay className="w-6 h-6" /> : <FaPause className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
