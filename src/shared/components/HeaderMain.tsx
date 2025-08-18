'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import HeaderLayout from '@/shared/components/HeaderMain/HeaderLayout';
import useHeaderModal from '@/shared/hooks/HeaderMain/useHeaderModal';
import useHeaderAuth from '@/shared/hooks/HeaderMain/useHeaderAuth';

const LoginModal = dynamic(() => import('@/features/auth/components/LoginModal'), {
  ssr: false,
});
const SignupModal = dynamic(() => import('@/features/auth/components/SignupModal'), {
  ssr: false,
});

export default function HeaderMain() {
  const { modalType, setModalType, handleOpenModal } = useHeaderModal();
  const { isLogin, profile, handleLogout } = useHeaderAuth();
  const [isScroll, setIsScroll] = useState(false);

  //  스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderLayout
        handleOpenModal={handleOpenModal}
        handleLogout={handleLogout}
        profile={profile}
        isLogin={isLogin}
        isScroll={isScroll}
      />
      {/* 모달 */}
      {modalType === 'login' && (
        <LoginModal
          onClose={() => {
            setModalType(null);
            document.body.style.overflow = 'auto';
          }}
          onChangeModal={(type) => setModalType(type)}
        />
      )}

      {modalType === 'signup' && (
        <SignupModal
          onClose={() => {
            setModalType(null);
            document.body.style.overflow = 'auto';
          }}
          onChangeModal={(type) => setModalType(type)}
        />
      )}
    </>
  );
}
