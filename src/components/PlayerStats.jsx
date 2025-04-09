import React from 'react';
import '../styles/global.css';

const PlayerStats = ({ user }) => {
  // Фейковые данные статистики
  const stats = {
    gamesPlayed: 40,
    wins: 25,
    losses: 15,
    points: 75,
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Welcome, {user?.firstName || 'Guest'}!</div>
        <div className="card-content">
          {user && (
            <div>
              <p>User ID: {user.id}</p>
              {user.username && <p>Username: @{user.username}</p>}
              {user.lastName && <p>Last Name: {user.lastName}</p>}
            </div>
          )}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{stats.gamesPlayed}</span>
              <span className="stat-label">Игры</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.wins}</span>
              <span className="stat-label">Победы</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.losses}</span>
              <span className="stat-label">Поражения</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.points}</span>
              <span className="stat-label">Очки</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;