'use client';
import React from 'react';
import type { LoginFormData } from '@/features/auth/schema/loginSchema';

import useLoginSubmit from '@/features/auth/hooks/useLoginSubmit';
import LoginModalMain from '@/features/auth/components/LoginModalMain';
// 로그인 모달 props
interface LoginModalProps {
  onClose: () => void;
  onChangeModal: (type: 'login' | 'signup') => void;
}

export default function LoginModal({ onClose, onChangeModal }: LoginModalProps) {
  const { handleSubmit, isSubmitting, onSubmit, loginField, oauthButtonsField, errors } =
    useLoginSubmit({
      onClose,
    });

  // 에러 메세지
  const errorMessages: { [key: string]: string | undefined } | undefined = errors
    ? Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value?.message]))
    : undefined;

  return (
    <>
      <LoginModalMain<LoginFormData>
        title="Log in to your account."
        submitLabel="Log in"
        fields={[loginField.email, loginField.password]}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        oauthButtons={oauthButtonsField}
        errors={errorMessages}
        switchLabel="Create an account"
        onSwitch={() => onChangeModal('signup')}
      />
    </>
  );
}
