import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import type { LoginFormData } from '@/features/auth/schema/loginSchema';
import type { SignupFormData } from '@/features/auth/schema/signupSchema';
import useSignupSubmit from './useSignupSubmit';
import useLoginSubmit from './useLoginSubmit';
export type FieldName<T extends FieldValues> = Path<T>;

export interface FieldProps<T extends FieldValues> {
  name: FieldName<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
}

export interface AuthFormStrategy<T extends FieldValues> {
  title: string;
  submitLabel: string;
  fields: FieldProps<T>[];
  isSubmitting: boolean;
  oauthButtons: { label: string; icon: string; alt: string; onClick: () => void }[];
  errors: { [key: string]: string | undefined };
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  switchLabel: string;
  onSwitch: () => void;
}

export function useLoginFormStrategy(
  onClose: () => void,
  onSwitch: () => void
): AuthFormStrategy<LoginFormData> {
  const { handleSubmit, isSubmitting, onSubmit, loginField, oauthButtonsField, errors } =
    useLoginSubmit({ onClose });
  const errorMessages = errors
    ? Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value?.message]))
    : {};

  return {
    title: 'Log in to your account.',
    submitLabel: 'Log in',
    fields: [loginField.email, loginField.password],
    isSubmitting,
    oauthButtons: oauthButtonsField,
    errors: errorMessages,
    onSubmit: handleSubmit(onSubmit),
    switchLabel: 'Create an account',
    onSwitch,
  };
}

export function useSignupFormStrategy(
  onClose: () => void,
  onSwitch: () => void
): AuthFormStrategy<SignupFormData> {
  const { handleSubmit, isSubmitting, onSubmit, signupField, oauthButtonsField, errors } =
    useSignupSubmit({ onClose });
  const errorMessages = errors
    ? Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value?.message]))
    : {};

  return {
    title: 'Sign up to Soundtalk',
    submitLabel: 'Sign up',
    fields: [
      signupField.username,
      signupField.email,
      signupField.password,
      signupField.confirmPassword,
    ],
    isSubmitting,
    oauthButtons: oauthButtonsField,
    errors: errorMessages,
    onSubmit: handleSubmit(onSubmit),
    switchLabel: 'Log in Here',
    onSwitch,
  };
}
