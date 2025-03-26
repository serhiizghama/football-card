import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

function App() {
  const [user, setUser] = useState<{ id: number; first_name: string } | null>(null);
  const [isInTelegram, setIsInTelegram] = useState(true);

  useEffect(() => {
    try {
      WebApp.ready();

      const userData = WebApp.initDataUnsafe?.user;

      if (userData) {
        setUser({
          id: userData.id,
          first_name: userData.first_name,
        });
      } else {
        console.warn('Пользователь не найден в initDataUnsafe');
      }
    } catch (e) {
      console.warn('Telegram WebApp не доступен:', e);
      setIsInTelegram(false);
    }
  }, []);

  if (!isInTelegram) {
    return (
      <div className="bg-gray-900 text-white p-6 rounded-xl text-center">
        <h1 className="text-xl font-bold mb-2">Открой через Telegram</h1>
        <p className="text-sm text-gray-400">Этот Web App работает только внутри Telegram-клиента.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center space-y-4">
      <h1 className="text-2xl font-bold">
        Привет, {user?.first_name || 'гость'}!
      </h1>
      <p className="text-lg">Твой Telegram ID: {user?.id || 'неизвестен'}</p>

      <button
        onClick={() => {
          console.log('WebApp:', WebApp);
          console.log('initDataUnsafe:', WebApp.initDataUnsafe);
          console.log('user:', WebApp.initDataUnsafe?.user);
        }}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
      >
        🔍 Консоль лог
      </button>
    </div>
  );
}

export default App;
