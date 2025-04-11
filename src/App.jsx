import React, { useState } from 'react';
import MobileLayout from './components/MobileLayout';
import PlayerStats from './components/PlayerStats';
import WelcomePage from './components/WelcomePage';
import useTelegram from './hooks/useTelegram';
import PlayerProfile from './components/PlayerProfile';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: isTelegramLoading } = useTelegram();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading screen for 5 seconds
  if (isLoading) {
    return <WelcomePage onLoadingComplete={handleLoadingComplete} />;
  }

  // Show loading state while getting Telegram user data
  if (isTelegramLoading) {
    return (
      <div className="loading-container">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <MobileLayout>
      {/* <PlayerStats user={user} /> */}
      <PlayerProfile />
    </MobileLayout>
  );
}

export default App;
