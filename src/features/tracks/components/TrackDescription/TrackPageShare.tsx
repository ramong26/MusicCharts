'use client';

export default function TrackPageShare() {
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다.');
      })
      .catch((error) => {
        console.error('링크 복사 실패:', error);
        alert('링크 복사에 실패했습니다.');
      });
  };

  return (
    <div className="cursor-pointer" onClick={handleCopyLink}>
      공유
    </div>
  );
}
