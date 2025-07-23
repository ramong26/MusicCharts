export default function ArtistInterview({ trackId }: { trackId: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">아티스트 인터뷰</h1>
      <p className="text-lg">
        이 페이지는 아티스트의 인터뷰 콘텐츠를 표시합니다.
      </p>
    </div>
  );
}
