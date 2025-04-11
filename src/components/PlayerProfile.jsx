import React, { useState } from 'react';
import '../styles/PlayerProfile.css';

const user = {
    username: 'John Doe',
    skill: 6.2,
    seasons: [
        {
            season: 'Winter 2025',
            games: 20,
            wins: 15,
            losses: 5,
            points: 45,
            efficiency: 7.8,
            achievements: [],
        },
        {
            season: 'Summer 2025',
            games: 20,
            wins: 15,
            losses: 5,
            points: 45,
            efficiency: 7.8,
            achievements: [
                { name: 'MVP', type: 'team', count: 5 },
                { name: 'Win Streak', type: 'team', count: 7 },
                { name: 'Hard to Beat', type: 'team', count: 4 },
                { name: 'N', type: 'personal', count: 3 },
            ],
        },
    ],
};

const PlayerProfile = () => {
    const [selectedSeason, setSelectedSeason] = useState(user.seasons[0]);

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>{user.username}</h1>
                <p>Skill: {user.skill}</p>
            </header>

            <div className="season-selector">
                <select onChange={(e) => setSelectedSeason(user.seasons.find(season => season.season === e.target.value))}>
                    {user.seasons.map((season) => (
                        <option key={season.season}>{season.season}</option>
                    ))}
                </select>
            </div>

            <div className="season-stats">
                <h2>Статистика сезона</h2>
                <ul>
                    <li>Количество игр: {selectedSeason.games}</li>
                    <li>Выигранных игр: {selectedSeason.wins}</li>
                    <li>Проигранных игр: {selectedSeason.losses}</li>
                    <li>Количество очков: {selectedSeason.points}</li>
                    <li>EFF efficiency: {selectedSeason.efficiency}</li>
                </ul>
            </div>

            <div className="achievements">
                <h2>Достижения</h2>
                <div className="personal-achievements">
                    <h3>Личные достижения</h3>
                    <ul>
                        {selectedSeason.achievements
                            .filter(achievement => achievement.type === 'personal')
                            .map((achievement, index) => (
                                <li key={index}>
                                    {achievement.name} – {achievement.count} штук
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="team-achievements">
                    <h3>Командные достижения</h3>
                    <ul>
                        {selectedSeason.achievements
                            .filter(achievement => achievement.type === 'team')
                            .map((achievement, index) => (
                                <li key={index}>
                                    {achievement.name} – {achievement.count} штук
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
