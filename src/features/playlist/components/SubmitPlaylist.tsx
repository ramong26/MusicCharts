"use client";

import { useState,useEffect } from "react";
import TrackComponent from "@/features/playlist/components/TrackComponent";
import SubmitInput from "@/shared/components/SubmitInput";
import { getTrackListFetch } from "@/shared/hooks/useTrackList";
import { TrackItem } from "@/shared/types/SpotifyTrack";

export default function SubmitPlaylist() {
  const [submitUrl, setSubmitUrl] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [data, setData] = useState<TrackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleSubmit = (id: string) => {
    if (!id) {
      console.error("플레이리스트 ID가 비어있음");
      setShowChart(false);
      return;
    }
    setPlaylistId(id);
    setShowChart(true);
  };


  const isValidData = Array.isArray(data) && data.length > 0;


  useEffect(()=>{
    if(!playlistId) return

    const fetchTracks = async () => {
      setLoading(true)
      setError(null)
      try{
        const result = await getTrackListFetch(playlistId)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    fetchTracks()
    }, [playlistId]);

    if (loading) {
      return <p>로딩 중...</p>;
    }
    if (error) {
      return <p>오류 발생: {error.message}</p>;
    } 
  return (
    <div>
      <SubmitInput
        placeholder="플레이리스트 ID를 넣어주세요"
        value={submitUrl}
        onChange={(e) => setSubmitUrl(e.target.value)}
        onSubmit={() => handleSubmit(submitUrl.trim())}
      />
      {showChart && (
        <>
          {isValidData ? (
            <TrackComponent tracksList={data} title="차트 제목" />
          ) : (
            <p>불러올 수 있는 트랙이 없습니다.</p>
          )}
        </>
      )}
    </div>
  );
}
