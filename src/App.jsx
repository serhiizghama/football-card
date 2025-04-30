// src/App.jsx
import React, { useState } from 'react';
import PlayerProfile from './components/PlayerProfile';
import GroupProfile from './components/GroupProfile';
import useTelegram from './hooks/useTelegram';
import './App.css';

function App() {
  const { user, isLoading: isTelegramLoading } = useTelegram();
  const [view, setView] = useState('player');

  // once useTelegram resolves, we'll have user.id
  if (isTelegramLoading) {
    return (
      <div className="app-loading">
        <p>Loading user data…</p>
      </div>
    );
  }

  const userId = user.userId;
  // pick a default groupId – or let the user select it later
  const groupId = user.defaultGroupId ?? user.userId;

  return (
    <div className="app-container">
      <nav className="app-nav">
        <button
          className={view === 'player' ? 'app-tab active' : 'app-tab'}
          onClick={() => setView('player')}
        >
          My Profile
        </button>
        <button
          className={view === 'group' ? 'app-tab active' : 'app-tab'}
          onClick={() => setView('group')}
        >
          Group Stats
        </button>
      </nav>

      <main className="app-main">
        {view === 'player' ? (
          <PlayerProfile userId={userId} groupId={groupId} />
        ) : (
          <GroupProfile groupId={groupId} />
        )}
      </main>
    </div>
  );
}

export default App;
