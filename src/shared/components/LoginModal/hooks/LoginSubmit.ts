import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormData } from '@/features/auth/schema/loginSchema';

export default function useLoginSubmit({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // 로그인 처리 함수
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }
      window.location.reload();
      onClose();
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
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
  const loginField = {
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
    loginField,
    oauthButtonsField,
    errors,
  };
}
