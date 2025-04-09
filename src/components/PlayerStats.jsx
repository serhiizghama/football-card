import React from 'react';
import '../styles/PlayerStats.css';

const PlayerStats = ({ user }) => {
  return (
    <div className="player-stats">
      <div className="user-info">
        <h2>Welcome, {user?.firstName || 'Guest'}!</h2>
        {user && (
          <div className="user-details">
            <p>User ID: {user.id}</p>
            {user.username && <p>Username: @{user.username}</p>}
            {user.lastName && <p>Last Name: {user.lastName}</p>}
          </div>
        )}
      </div>
      {/* Add your player stats content here */}
    </div>
  );
};

export default PlayerStats; 