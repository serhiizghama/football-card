import React, { useState } from 'react';
import MobileLayout from './components/MobileLayout';
import PlayerStats from './components/PlayerStats';
import WelcomePage from './components/WelcomePage';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <WelcomePage onLoadingComplete={handleLoadingComplete} />
      ) : (
        <MobileLayout>
          <PlayerStats />
        </MobileLayout>
      )}
    </>
  );
}

export default App;
