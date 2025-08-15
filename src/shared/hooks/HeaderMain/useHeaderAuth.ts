import { useEffect, useState } from 'react';

import useUserStore from '@/stores/userStore';
import DefaultProfile from '@/public/image/default-profile-image.avif';

interface Profile {
  displayName: string;
  profileImageUrl?: string | null;
}
export default function useHeaderAuth() {
  const { setUser } = useUserStore();
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    // 로그인 상태 확인
    fetch('/api/profile', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    })
      .then((res) => {
        if (!res.ok) throw new Error('로그인 안 됨');
        return res.json();
      })
      .then((data) => {
        const profileImage = data.profileImageUrl || DefaultProfile;
        setProfile({ ...data, profileImageUrl: profileImage });
        setIsLogin(true);
        setUser({ ...data, _id: data.id, profileImageUrl: profileImage });
      })
      .catch(() => {
        setProfile(null);
        setIsLogin(false);
      });
  }, [setUser]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { credentials: 'include' });
    window.location.href = '/';
  };

  return { isLogin, profile, handleLogout };
}
