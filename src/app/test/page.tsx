'use client';
export default function TestPage() {
  const onClick = () => {
    alert('모달 테스트');
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="cursor-pointer" onClick={onClick}>
        모달 테스트{' '}
      </h1>
    </div>
  );
}
