"use client";

import { useEffect, useState } from "react";
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}
export default function Miniplayer() {
  const [player, setPlayer] = useState(null);
  const [track, setTrack] = useState(null);
  const [paused, setPaused] = useState(true);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Web Player",
        getOAuthToken: (cb: any) => cb(token),
        volume: 0.5,
      });

      player.addListener("ready", async ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);

        await fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: true,
          }),
        });
      });

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
      setPlayer(player);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#181818] text-white px-4 py-2 flex items-center justify-between shadow-md">
      {/* Album Art */}
      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/50"
          alt="Album Art"
          className="w-12 h-12 rounded-md"
        />
        <div>
          <div className="text-sm font-semibold">Song Title</div>
          <div className="text-xs text-gray-400">Artist Name</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button className="hover:text-green-500 transition" aria-label="Pause">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6"
            />
          </svg>
        </button>
        <button className="hover:text-green-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 3v18l15-9L5 3z" />
          </svg>
        </button>
        <button className="hover:text-green-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 9v6m4-6v6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
