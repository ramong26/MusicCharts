'use client';
import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoginModalLayout from '@/shared/components/LoginModal/LoginModalLayout';
import { loginSchema, LoginFormData } from '@/features/auth/schema/loginSchema';
// 로그인 모달 props
interface LoginModalProps {
  onClose: () => void;
  onChangeModal: (type: 'login' | 'signup') => void;
}
export default function LoginModal({ onClose, onChangeModal }: LoginModalProps) {
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

  return (
    <>
      <LoginModalLayout onClose={onClose}>
        {/* 로고 영역 */}
        <div className="mb-6 flex items-center justify-center">
          <span className="text-3xl font-extrabold text-black">Soundtalk</span>
        </div>
        <h2 className="text-lg font-bold mb-4 text-center text-black">Log in to your account.</h2>
        {/* 이메일 입력 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full mb-3">
            <label className="flex items-center border rounded px-3 py-2 bg-white">
              <span className="mr-2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M2 6l8 6 8-6" />
                </svg>
              </span>
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full outline-none bg-transparent"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </label>
          </div>
          {/* 비밀번호 입력 */}
          <div className="w-full mb-3">
            <label className="flex items-center border rounded px-3 py-2 bg-white">
              <span className="mr-2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 14v-4" />
                </svg>
              </span>
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full outline-none bg-transparent"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
              <span className="ml-2 text-gray-400 cursor-pointer">
                <svg width="20" height="20" fill="none" stroke="currentColor">
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </span>
            </label>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-beige-light hover:bg-beige-medium border  text-black font-bold py-2 rounded mb-4 transition-colors duration-200"
          >
            {isSubmitting ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>
        {/* OR 구분선 */}
        <div className="flex items-center w-full my-2">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-500 font-bold">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        {/* oauth 로그인 버튼 */}
        <button
          onClick={signWithSpotify}
          className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            width={24}
            height={24}
            className="w-6 h-6 mr-2"
          />
          <span className="font-semibold text-black">Sign In with Spotify</span>
        </button>
        <button
          onClick={signWithGoogle}
          className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100"
        >
          <Image
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            width={24}
            height={24}
            className="w-6 h-6 mr-2"
          />
          <span className="font-semibold text-black">Sign In with Google</span>
        </button>
        <button
          onClick={() => onChangeModal('signup')}
          className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100"
        >
          <span className="font-semibold text-black">Go to Sign Up</span>
        </button>
      </LoginModalLayout>
    </>
  );
}
