"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

import { Track } from "@/shared/types/SpotifyTrack";

export default function Miniplayer({ track }: { track: Track }) {
  const [paused, setPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(track);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("스포티파이 프리미엄 계정이 필요합니다.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true; // 스크립트 비동기로
    document.body.appendChild(script); //만들어진 스크립트를 실제 문서의 바디에 추가

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });
      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uris: [`spotify:track:${track.id}`],
            }),
          }
        ).catch(console.error);
      });
      player.addListener("player_state_changed", (state) => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track as unknown as Track);
        setPaused(state.paused);
      });

      player.connect();
    };
  }, [track]);

  return (
    <div className="w-full bg-black text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={currentTrack?.album?.images[1]?.url}
          alt="Album Art"
          className="w-12 h-12  mr-4"
          width={48}
          height={48}
        />
        <div>
          <h3 className="text-lg font-semibold">{currentTrack?.name}</h3>
          <p className="text-sm text-gray-400">
            {currentTrack?.artists[0]?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => player.togglePlay()}
          className="text-white bg-green-500 p-2 rounded-full hover:bg-green-600"
        >
          {paused ? <FaPlay /> : <FaPause />}
        </button>
      </div>
    </div>
  );
}
