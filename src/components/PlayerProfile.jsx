import React from 'react';
import '../styles/styles.css';

const PlayerProfile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Футболист Pro</h1>
        <p>Skill: 6.2</p>
      </header>
      
      <div className="season-selector">
        <select>
          <option>Winter 2025</option>
          <option>Summer 2025</option>
          <option>Итоговая статистика</option>
        </select>
      </div>
      
      <div className="season-stats">
        <h2>Статистика сезона</h2>
        <ul>
          <li>Количество игр: 20</li>
          <li>Выигранных игр: 15</li>
          <li>Проигранных игр: 5</li>
          <li>Количество очков: 45</li>
          <li>EFF efficiency: 7.8</li>
        </ul>
      </div>
      
      <div className="achievements">
        <h2>Достижения</h2>
        <div className="personal-achievements">
          <h3>Личные достижения</h3>
          <p>Placeholder</p>
        </div>
        <div className="team-achievements">
          <h3>Командные достижения</h3>
          <ul>
            <li>🏆 MVP Team – 5 штук</li>
            <li>🔥 Win Streak – 7 штук</li>
            <li>💪 Hard to Beat – 4 штук</li>
            <li>🛡️ Iron Defense – 3 штук</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
