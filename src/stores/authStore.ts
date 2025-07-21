import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserData {
  id: number;
  nickname: string;
  email: string;
  profileImageUrl?: string;
}

interface AuthState {
  accessToken: string | null;
  userData: UserData | null;
  setAccessToken: (token: string) => void;
  setUserData: (data: UserData) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userData: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      setUserData: (data: UserData) => set({ userData: data }),
      clearAuth: () => set({ accessToken: null, userData: null }),
    }),
    {
      name: 'auth-storage',
      storage:
        typeof window !== 'undefined' &&
        window.location.hostname === 'localhost'
          ? createJSONStorage(() => localStorage) // 개발환경에서는 로컬스토리지 사용
          : createJSONStorage(() => sessionStorage), // 배포 환경에서는 세션스토리지 사용
    }
  )
);
