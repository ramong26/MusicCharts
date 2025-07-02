"use client";

import { useState } from "react";
import ChartComponent from "@/features/chart/components/ChartComponent";
import SubmitInput from "@/shared/components/SubmitInput";
import { useTrackListFetch } from "@/shared/hooks/useTrackList";

export default function SubmitPlaylist() {
  const [submitUrl, setSubmitUrl] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [showChart, setShowChart] = useState(false);

  const handleSubmit = (url: string) => {
    const id = extractPlaylistId(url);
    if (!id) {
      console.error("Invalid URL format");
      setShowChart(false);
      return;
    }
    setPlaylistId(id);
    setShowChart(true);
  };

  const data = useTrackListFetch({
    playlistId: showChart ? playlistId : undefined,
  });

  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <div>
      <SubmitInput
        placeholder="url을 넣어주세요"
        value={submitUrl}
        onChange={(e) => setSubmitUrl(e.target.value)}
        onSubmit={() => handleSubmit(submitUrl)}
      />
      {showChart && (
        <>
          {isValidData ? (
            <ChartComponent tracksList={data} title="차트 제목" />
          ) : (
            <p>불러올 수 있는 트랙이 없습니다.</p>
          )}
        </>
      )}
    </div>
  );
}

function extractPlaylistId(url: string): string | null {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}
