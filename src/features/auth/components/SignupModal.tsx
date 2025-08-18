'use client';
import React from 'react';

import type { SignupFormData } from '@/features/auth/schema/signupSchema';
import LoginModalMain from '@/features/auth/components/LoginModalMain';
import useSignupSubmit from '@/features/auth/hooks/useSignupSubmit';

// 회원가입 모달 props
interface SignupModalProps {
  onClose: () => void;
  onChangeModal: (type: 'login' | 'signup') => void;
}

export default function SignupModal({ onClose, onChangeModal }: SignupModalProps) {
  const { handleSubmit, errors, isSubmitting, onSubmit, signupField } = useSignupSubmit({
    onClose,
  });

  // 에러메세지
  const errorMessages: { [key: string]: string | undefined } | undefined = errors
    ? Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value?.message]))
    : undefined;

  // 필드
  const signupFields = [
    signupField.username,
    signupField.email,
    signupField.password,
    signupField.confirmPassword,
  ];

  return (
    <>
      <LoginModalMain<SignupFormData>
        title="Sign up to Soundtalk"
        submitLabel="Sign up"
        fields={signupFields}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        errors={errorMessages}
        switchLabel="Log in Here"
        onSwitch={() => onChangeModal('login')}
      />
    </>
  );
}
