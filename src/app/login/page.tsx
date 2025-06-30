export default async function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">로그인</h1>
        <p className="text-gray-600">로그인 후 서비스를 이용할 수 있습니다.</p>
        <a
          href="/api/auth/login"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          스포티파이로 로그인하기
        </a>
      </div>
    </div>
  );
}
