import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram: any;
  }
}

function App() {
  const [user, setUser] = useState<{ id: number; first_name: string } | null>(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const userData = tg.initDataUnsafe?.user;
    if (userData) {
      setUser({
        id: userData.id,
        first_name: userData.first_name,
      });
    }
  }, []);

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-4">
        Привет, {user?.first_name || 'гость'}!
      </h1>
      <p className="text-lg">Твой Telegram ID: {user?.id || 'неизвестен'}</p>
    </div>
  );
}

export default App;
