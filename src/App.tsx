import './App.css';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-end bg-gray-900 text-white p-6">
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex justify-around items-center sm:justify-center sm:gap-6">
        <button className="text-white text-sm sm:text-lg flex flex-col items-center">
          <span>🏠</span>
          <span>Главная</span>
        </button>
        <button className="text-white text-sm sm:text-lg flex flex-col items-center">
          <span>⚽</span>
          <span>Матчи</span>
        </button>
        <button className="text-white text-sm sm:text-lg flex flex-col items-center">
          <span>👤</span>
          <span>Игроки</span>
        </button>
        <button className="text-white text-sm sm:text-lg flex flex-col items-center">
          <span>⚙️</span>
          <span>Настройки</span>
        </button>
      </div>
    </div>
  );
}
