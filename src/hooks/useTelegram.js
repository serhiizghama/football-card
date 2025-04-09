import { useEffect, useState } from 'react';

const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    
    // Initialize Telegram WebApp
    tg.ready();
    
    // Expand the WebApp to full height
    tg.expand();

    // Get user data
    if (tg.initDataUnsafe?.user) {
      setUser({
        id: tg.initDataUnsafe.user.id,
        firstName: tg.initDataUnsafe.user.first_name,
        lastName: tg.initDataUnsafe.user.last_name,
        username: tg.initDataUnsafe.user.username,
        languageCode: tg.initDataUnsafe.user.language_code,
        startParam: tg.initDataUnsafe.start_param,
      });
    }
    
    setIsLoading(false);
  }, []);

  return {
    user,
    isLoading,
    tg: window.Telegram?.WebApp
  };
};

export default useTelegram; 