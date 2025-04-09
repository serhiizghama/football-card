import React from 'react';
import '../styles/PlayerStats.css';

const PlayerStats = () => {
  // Заглушка данных игрока
  const playerData = {
    name: "Александр",
    gamesPlayed: 156,
    wins: 89,
    losses: 67,
    score: 1250
  };

  return (
    <div className="player-stats">
      <div className="player-header">
        <div className="player-avatar">
          <i className="fas fa-futbol"></i>
        </div>
        <h2 className="player-name">{playerData.name}</h2>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <i className="fas fa-running"></i>
          <div className="stat-info">
            <span className="stat-value">{playerData.gamesPlayed}</span>
            <span className="stat-label">Матчей сыграно</span>
          </div>
        </div>
        
        <div className="stat-card">
          <i className="fas fa-trophy"></i>
          <div className="stat-info">
            <span className="stat-value">{playerData.wins}</span>
            <span className="stat-label">Побед</span>
          </div>
        </div>
        
        <div className="stat-card">
          <i className="fas fa-times-circle"></i>
          <div className="stat-info">
            <span className="stat-value">{playerData.losses}</span>
            <span className="stat-label">Поражений</span>
          </div>
        </div>
        
        <div className="stat-card">
          <i className="fas fa-futbol"></i>
          <div className="stat-info">
            <span className="stat-value">{playerData.score}</span>
            <span className="stat-label">Голов</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats; 