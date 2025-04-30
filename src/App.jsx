import React from 'react';
import useTelegram from './hooks/useTelegram';
import GroupsTable from './components/GroupsTable';
import './App.css';

function App() {
  const { isLoading: isTelegramLoading } = useTelegram();

  // пока тянем Telegram-данные
  if (isTelegramLoading) {
    return (
      <div className="loading-container">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div>
      <GroupsTable />
    </div>
  );
}

export default App;
