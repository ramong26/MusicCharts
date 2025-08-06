import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .email({ message: '올바른 이메일 형식이 아닙니다 (예: user@example.com)' })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: '유효한 이메일 주소를 입력해주세요',
      }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다' })
      .regex(/(?=.*[!@#$%^&*])/, { message: '특수문자를 포함해야 합니다' }),
  })
  .refine((data) => data.email && data.password, {
    message: '이메일과 비밀번호를 모두 입력해주세요',
    path: ['email', 'password'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
