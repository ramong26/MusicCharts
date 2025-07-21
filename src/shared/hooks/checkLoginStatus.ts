export const checkLoginStatus = async (): Promise<{
  isLoggedIn: boolean;
  accessToken?: string;
}> => {
  try {
    const response = await fetch('/api/cookie', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return { isLoggedIn: false };
    }

    const data = await response.json();
    return {
      isLoggedIn: true,
      accessToken: data.access_token,
    };
  } catch (error) {
    console.error('Error checking login status:', error);
    return { isLoggedIn: false };
  }
};
