import './App.css';
export function App() {
  return (
    <div className="min-h-screen flex flex-col justify-end bg-gray-900 text-white p-6">
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex justify-around">
        <button className="text-white text-lg">Главная</button>
        <button className="text-white text-lg">Матчи</button>
        <button className="text-white text-lg">Игроки</button>
        <button className="text-white text-lg">Настройки</button>
      </div>
    </div>
  );
}
export default App
