// 날짜 연도 월 일 출력 함수
export const formatDate = (isoDate: string | Date): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// 날짜 비교 함수
export const diffDate = (isoDate: string) => {
  const createdDate = new Date(isoDate);
  const today = new Date();

  createdDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = today.getTime() - createdDate.getTime();
  const diffDays = diff / (1000 * 60 * 60 * 24);

  return Math.floor(diffDays);
};

// 시간 출력 함수
export const formatTime = (seconds: number) => {
  const sec = Math.floor(seconds);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(
      2,
      '0'
    )}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
