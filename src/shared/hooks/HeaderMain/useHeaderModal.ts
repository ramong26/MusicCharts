import { useState } from 'react';

export default function useHeaderModal() {
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);

  const handleOpenModal = (type: 'login' | 'signup') => {
    setModalType(type);
    document.body.style.overflow = 'hidden';
  };

  return { modalType, setModalType, handleOpenModal };
}
