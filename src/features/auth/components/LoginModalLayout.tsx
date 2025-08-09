interface LoginModalLayoutProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function LoginModalLayout({ onClose, children }: LoginModalLayoutProps) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-transparent backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 w-[400px] flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl cursor-pointer"
          aria-label="닫기"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
