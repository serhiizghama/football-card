import React, { useState } from 'react';
import PlayerProfile from './components/PlayerProfile';
import useTelegram from './hooks/useTelegram';
import './App.css';

function App() {
  const { user, isLoading: isTelegramLoading } = useTelegram();

  // Show loading state while getting Telegram user data
  if (isTelegramLoading) {
    return (
      <div className="loading-container">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div>
      <PlayerProfile />
    </div>
  );
}

export default App;
