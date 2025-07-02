"use client";

import { useState } from "react";

import PlaylistInterviewList from "@/features/playlist/components/PlaylistInterviewList";
import TrackComponent from "@/features/playlist/components/TrackComponent";
import SubmitInput from "@/shared/components/SubmitInput";
import { useTrackListQuery } from "@/features/playlist/hooks/useTrackListQuery";

export default function SubmitPlaylist() {
  const [submitUrl, setSubmitUrl] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [showChart, setShowChart] = useState(false);

  const handleSubmit = (id: string) => {
    if (!id) {
      console.error("플레이리스트 ID가 비어있음");
      setShowChart(false);
      return;
    }
    setPlaylistId(id.trim());
    setShowChart(true);
  };

  const { data, isLoading, error } = useTrackListQuery(playlistId);
  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <div>
      <div>
      <SubmitInput
        placeholder="플레이리스트 ID를 넣어주세요"
        value={submitUrl}
        onChange={(e) => setSubmitUrl(e.target.value)}
        onSubmit={() => handleSubmit(submitUrl)}
      />

      {showChart && (
        <>
          {isLoading && <p>로딩 중...</p>}
          {error && <p>오류 발생: {error.message}</p>}
          {isValidData ? (
            <TrackComponent tracksList={data} title="차트 제목" />
          ) : (
            !isLoading && !error && <p>불러올 수 있는 트랙이 없습니다.</p>
          )}
        </>
      )}
      </div>
      <div>
         <PlaylistInterviewList playlistId={playlistId}/>
      </div>
    </div>
  );
}
