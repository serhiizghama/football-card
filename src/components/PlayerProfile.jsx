import React, { useState, useEffect } from 'react';
import '../styles/PlayerProfile.css';

/**
 * @typedef {Object} Achievement
 * @property {string} emoji
 * @property {string} title
 * @property {'team' | 'personal'} type
 * @property {string} description
 */

/**
 * @typedef {Object} SeasonProfile
 * @property {string} season
 * @property {number} games
 * @property {number} wins
 * @property {number} losses
 * @property {number} draws
 * @property {number} points
 * @property {number} efficiency
 * @property {number} skill
 * @property {Achievement[]} achievements
 */

/**
 * @typedef {Object} UserProfile
 * @property {number} userId
 * @property {string} username
 * @property {number} groupId
 * @property {string} groupName
 * @property {SeasonProfile[]} seasons
 */

const PlayerProfile = () => {
    const [user, setUser] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    // Здесь можно подтягивать параметры через props или useParams из react-router
    const userId = 277364372;
    const groupId = -1001891077621;

    useEffect(() => {
        fetch(`https://api.ballrush.online/user/${userId}/group/${groupId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                if (data.seasons.length > 0) {
                    setSelectedSeason(data.seasons[0]);
                }
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }, [userId, groupId]);

    if (!user) {
        return <div>Загрузка профиля…</div>;
    }
    if (!selectedSeason) {
        return <div>У пользователя нет сезонов</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>{user.username}</h1>
                <p>Группа: {user.groupName}</p>
            </header>

            <div className="season-selector">
                <select
                    value={selectedSeason.season}
                    onChange={(e) => {
                        const s = user.seasons.find(sea => sea.season === e.target.value);
                        if (s) setSelectedSeason(s);
                    }}
                >
                    {user.seasons.map((season) => (
                        <option key={season.season} value={season.season}>
                            {season.season}
                        </option>
                    ))}
                </select>
            </div>

            <div className="season-stats">
                <h2>Статистика сезона: {selectedSeason.season}</h2>
                <ul>
                    <li>Количество игр: {selectedSeason.games}</li>
                    <li>Выигранных игр: {selectedSeason.wins}</li>
                    <li>Проигранных игр: {selectedSeason.losses}</li>
                    <li>Ничьих: {selectedSeason.draws}</li>
                    <li>Очков: {selectedSeason.points}</li>
                    <li>EFF (эффективность): {selectedSeason.efficiency}</li>
                    <li>Skill: {selectedSeason.skill}</li>
                </ul>
            </div>

            <div className="achievements">
                <h2>Достижения</h2>

                <div className="personal-achievements">
                    <h3>Личные достижения</h3>
                    {selectedSeason.achievements.filter(a => a.type === 'personal').length === 0
                        ? <p>Нет личных достижений</p>
                        : <ul>
                            {selectedSeason.achievements
                                .filter(a => a.type === 'personal')
                                .map((ach, idx) => (
                                    <li key={idx}>
                                        {ach.emoji} <strong>{ach.title}</strong> — {ach.description}
                                    </li>
                                ))}
                        </ul>
                    }
                </div>

                <div className="team-achievements">
                    <h3>Командные достижения</h3>
                    {selectedSeason.achievements.filter(a => a.type === 'team').length === 0
                        ? <p>Нет командных достижений</p>
                        : <ul>
                            {selectedSeason.achievements
                                .filter(a => a.type === 'team')
                                .map((ach, idx) => (
                                    <li key={idx}>
                                        {ach.emoji} <strong>{ach.title}</strong> — {ach.description}
                                    </li>
                                ))}
                        </ul>
                    }
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
