import { useRef, useState, useEffect } from 'react';

// IntersectionObserver 이용 뷰포트에 들어왔을 때만 컴포넌트 렌더링
export default function LazyComponent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entry.isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return <div ref={ref}>{show && children}</div>;
}
