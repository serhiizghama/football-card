import React, { useState, useEffect } from 'react';
import '../styles/PlayerProfile.css';

const PlayerProfile = () => {
    const [user, setUser] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        // Выполняем запрос к серверу
        fetch('http://188.212.125.80:3003/api/user/123/group/123')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setSelectedSeason(data.seasons[0]); // Устанавливаем первый сезон по умолчанию
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }, []);

    if (!user || !selectedSeason) {
        return <div>Загрузка...</div>; // Показываем индикатор загрузки, пока данные не загружены
    }

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