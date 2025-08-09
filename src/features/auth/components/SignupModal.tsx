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
  const { handleSubmit, errors, isSubmitting, onSubmit, signupField, oauthButtonsField } =
    useSignupSubmit({ onClose });

  // 에러메세지
  const errorMessages: { [key: string]: string | undefined } | undefined = errors
    ? Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value?.message]))
    : undefined;

  // 회원가입 처리 함수
  // const onSubmit = async (data: SignupFormData) => {
  //   try {
  //     const response = await fetch('/api/auth/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error('회원가입 실패');
  //     }

  //     onChangeModal('login');
  //   } catch (error) {
  //     console.error('회원가입 오류:', error);
  //     alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  //   }
  // };

  return (
    <>
      <LoginModalMain<SignupFormData>
        title="Sign Up to Soundtalk"
        submitLabel="Sign Up"
        fields={[
          signupField.username,
          signupField.email,
          signupField.password,
          signupField.confirmPassword,
        ]}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        oauthButtons={oauthButtonsField}
        errors={errorMessages}
        switchLabel="Log in Here"
        onSwitch={() => onChangeModal('login')}
      />
    </>
  );
}
