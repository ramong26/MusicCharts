'use client';
import Image from 'next/image';

import type { LoginFormData } from '@/features/auth/schema/loginSchema';
import type { UseFormRegister } from 'react-hook-form';

import LoginModalLayout from '@/shared/components/LoginModal/LoginModalLayout';

type FieldName = keyof LoginFormData;

interface LoginModalMainProps {
  onClose: () => void;
  title: string;
  fields: {
    name: FieldName;
    type: string;
    placeholder: string;
    register: UseFormRegister<LoginFormData>;
    error?: string;
  }[];
  isSubmitting?: boolean;
  submitLabel: string;
  oauthButtons?: {
    label: string;
    icon: string;
    alt: string;
    onClick: () => void;
  }[];
  switchLabel: string;
  onSwitch: () => void;
  errors?: { [key: string]: string | undefined };
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function LoginModalMain({
  onClose,
  title,
  onSubmit,
  fields,
  isSubmitting,
  submitLabel,
  oauthButtons,
  switchLabel,
  onSwitch,
  errors,
}: LoginModalMainProps) {
  return (
    <LoginModalLayout onClose={onClose}>
      <div className="mb-6 flex items-center justify-center">
        <span className="text-3xl font-extrabold text-black">Soundtalk</span>
      </div>
      <h2 className="text-lg font-bold mb-4 text-center text-black">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        {fields.map((field) => (
          <div key={field.name} className="w-full mb-3">
            <label className=" flex items-center border rounded px-3 py-2 bg-white">
              <span className="mr-2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M2 6l8 6 8-6" />
                </svg>
              </span>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full outline-none bg-transparent"
                {...field.register(field.name)}
              />
              <span className="text-red-500 text-sm">{errors?.[field.name] ?? ''}</span>
            </label>
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-beige-light hover:bg-beige-medium border  text-black font-bold py-2 rounded mb-4 transition-colors duration-200"
        >
          {isSubmitting ? `${submitLabel}...` : submitLabel}
        </button>
      </form>
      {/* OR 구분선 */}
      <div className="flex items-center w-full my-2">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-2 text-gray-500 font-bold">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>
      {oauthButtons?.map((btn) => (
        <button
          key={btn.label}
          onClick={btn.onClick}
          className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100"
        >
          <Image src={btn.icon} alt={btn.alt} width={24} height={24} className="w-6 h-6 mr-2" />
          <span className="font-semibold text-black">{btn.label}</span>
        </button>
      ))}
      <button
        onClick={onSwitch}
        className="cursor-pointer w-full flex items-center justify-center border rounded py-2 mb-4 bg-white hover:bg-gray-100"
      >
        <span className="font-semibold text-black">{switchLabel}</span>
      </button>
    </LoginModalLayout>
  );
}
