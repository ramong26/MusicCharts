'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, SignupFormData } from '@/features/auth/schema/signupSchema';

export default function useSignupSubmit({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // 회원가입 처리 함수
  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('회원가입 실패');
      }
      router.push('/');
      onClose();
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  // Spotify 로그인 함수
  const signWithSpotify = async () => {
    window.location.href = '/api/auth/spotify/login';
  };

  // Google 로그인 함수
  const signWithGoogle = async () => {
    window.location.href = '/api/auth/google/login';
  };

  // 회원가입 필드 설정
  const signupField = {
    username: {
      name: 'username' as const,
      type: 'text',
      placeholder: 'Nickname을 입력해주세요',
      register,
    },
    email: {
      name: 'email' as const,
      type: 'email',
      placeholder: 'Email을 입력해주세요',
      register,
    },
    password: {
      name: 'password' as const,
      type: 'password',
      placeholder: 'Password을 입력해주세요',
      register,
    },
    confirmPassword: {
      name: 'confirmPassword' as const,
      type: 'password',
      placeholder: 'Confirm Password을 입력해주세요',
      register,
    },
  };

  const oauthButtonsField = [
    {
      label: 'Continue with Spotify',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      alt: 'Spotify',
      onClick: signWithSpotify,
    },
    {
      label: 'Continue with Google',
      icon: 'https://www.svgrepo.com/show/355037/google.svg',
      alt: 'Google',
      onClick: signWithGoogle,
    },
  ];

  return {
    handleSubmit,
    isSubmitting,
    onSubmit,
    signupField,
    oauthButtonsField,
    errors,
  };
}
