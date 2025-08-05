'use client';
import React from 'react';
import Image from 'next/image';

import LoginModalLayout from '@/shared/components/LoginModal/LoginModalLayout';
import { signupSchema } from '@/features/auth/schema/signupSchema';

// 회원가입 모달 props
interface SignupModalProps {
  onClose: () => void;
  onChangeModal: (type: 'login' | 'signup') => void;
}

export default function SignupModal({ onClose, onChangeModal }: SignupModalProps) {
  const { email, password, confirmPassword } = signupSchema.shape;
  return (
    <>
      <LoginModalLayout onClose={onClose}>
        {/* 로고 영역 */}
        <div className="mb-6 flex items-center justify-center">
          <span className="text-3xl font-extrabold text-black">Soundtalk</span>
        </div>
        <h2 className="text-lg font-bold mb-4 text-center text-black">Sign up to your account.</h2>
        {/* 이메일 입력 */}
        <div className="w-full mb-3">
          <label className="flex items-center border rounded px-3 py-2 bg-white">
            <span className="mr-2 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor">
                <path d="M2 6l8 6 8-6" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
            />
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
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
            />
            <span className="ml-2 text-gray-400 cursor-pointer">
              <svg width="20" height="20" fill="none" stroke="currentColor">
                <circle cx="10" cy="10" r="8" />
              </svg>
            </span>
          </label>
        </div>
        {/* 비밀번호 확인 입력 */}
        <div className="w-full mb-3">
          <label className="flex items-center border rounded px-3 py-2 bg-white">
            <span className="mr-2 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor">
                <circle cx="10" cy="10" r="8" />
                <path d="M10 14v-4" />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
            />
            <span className="ml-2 text-gray-400 cursor-pointer">
              <svg width="20" height="20" fill="none" stroke="currentColor">
                <circle cx="10" cy="10" r="8" />
              </svg>
            </span>
          </label>
        </div>
        {/* 로그인 버튼 */}
        <button className="w-full bg-beige-light hover:bg-beige-medium border  text-black font-bold py-2 rounded mb-4 transition-colors duration-200">
          SIGN UP
        </button>
        {/* OR 구분선 */}
        <div className="flex items-center w-full my-2">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-500 font-bold">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        {/* 구글 로그인 버튼 */}
        <button className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            width={24}
            height={24}
            className="w-6 h-6 mr-2"
          />
          <span className="font-semibold text-black">Sign In with Spotify</span>
        </button>
        <button className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100">
          <Image
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            width={24}
            height={24}
            className="w-6 h-6 mr-2"
          />
          <span className="font-semibold text-black">Sign Up with Google</span>
        </button>
        <button
          onClick={() => onChangeModal('login')}
          className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100"
        >
          <span className="font-semibold text-black">Go to Sign In</span>
        </button>
      </LoginModalLayout>
    </>
  );
}
