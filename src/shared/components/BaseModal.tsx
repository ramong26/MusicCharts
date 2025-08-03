export default function BaseModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">모달 제목</h2>
        <p className="mb-4">모달 내용이 여기에 들어갑니다.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">닫기</button>
      </div>
    </div>
  );
}
