import React, { useState, useEffect } from 'react';
import {
    FaFutbol,          // Игры
    FaTrophy,          // Победы
    FaTimesCircle,     // Поражения
    FaHandshake,       // Ничьи
    FaStar,            // Очки
    FaTachometerAlt,   // EFF
    FaBrain            // Skill
} from 'react-icons/fa';

import '../styles/PlayerProfile.css';

/**
 * Группируем повторяющиеся ачивки и считаем их количество
 * @param {Array} achs
 * @returns {Array<{emoji: string, title: string, type: string, description: string, count: number}>}
 */
function groupAchievements(achs) {
    const map = {};
    achs.forEach(a => {
        const key = a.title;
        if (!map[key]) {
            map[key] = { ...a, count: 0 };
        }
        map[key].count++;
    });
    return Object.values(map);
}

const PlayerProfile = () => {
    const [user, setUser] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    // Здесь можно получать из пропсов или useParams
    // const userId = 277364372;
    const userId = 5197715916;
    const groupId = -1001891077621;

    useEffect(() => {
        fetch(`https://api.ballrush.online/user/${userId}/group/${groupId}`)
            .then(res => {
                if (!res.ok) throw new Error('Ошибка загрузки данных');
                return res.json();
            })
            .then(data => {
                setUser(data);
                if (data.seasons.length) setSelectedSeason(data.seasons[0]);
            })
            .catch(err => console.error('Ошибка:', err));
    }, [userId, groupId]);

    if (!user) return <div className="loading">Загрузка профиля…</div>;
    if (!selectedSeason) return <div className="loading">У пользователя нет сезонов</div>;

    // Сгруппированные ачивки
    const personal = groupAchievements(
        selectedSeason.achievements.filter(a => a.type === 'personal')
    );
    const team = groupAchievements(
        selectedSeason.achievements.filter(a => a.type === 'team')
    );

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>{user.username}</h1>
                <p>Группа: {user.groupName}</p>
            </header>

            <div className="season-selector">
                <select
                    value={selectedSeason.season}
                    onChange={e => {
                        const s = user.seasons.find(x => x.season === e.target.value);
                        if (s) setSelectedSeason(s);
                    }}
                >
                    {user.seasons.map(s => (
                        <option key={s.season} value={s.season}>
                            {s.season}
                        </option>
                    ))}
                </select>
            </div>

            <div className="season-stats">
                <h2>Статистика сезона: {selectedSeason.season}</h2>
                <ul className="season-stats-list">
                    <li>
                        <FaFutbol className="stat-icon" />
                        <span>Игры: {selectedSeason.games}</span>
                    </li>
                    <li>
                        <FaTrophy className="stat-icon" />
                        <span>Победы: {selectedSeason.wins}</span>
                    </li>
                    <li>
                        <FaTimesCircle className="stat-icon" />
                        <span>Поражения: {selectedSeason.losses}</span>
                    </li>
                    <li>
                        <FaHandshake className="stat-icon" />
                        <span>Ничьи: {selectedSeason.draws}</span>
                    </li>
                    <li>
                        <FaStar className="stat-icon" />
                        <span>Очки: {selectedSeason.points}</span>
                    </li>
                    <li>
                        <FaTachometerAlt className="stat-icon" />
                        <span>EFF: {selectedSeason.efficiency}</span>
                    </li>
                    <li>
                        <FaBrain className="stat-icon" />
                        <span>Skill: {selectedSeason.skill}</span>
                    </li>
                </ul>

            </div>

            <div className="achievements">
                <h2>Достижения</h2>

                {/* Личные достижения — показываем только если есть */}
                {personal.length > 0 && (
                    <section className="ach-section">
                        <h3>Личные</h3>
                        <ul className="ach-list">
                            {personal.map(a => (
                                <li key={a.title}>
                                    <span className="ach-emoji">{a.emoji}</span>
                                    <span className="ach-title">{a.title}</span>
                                    {/* Всегда показываем count, даже если 1 */}
                                    <span className="ach-count">×{a.count}</span>
                                    <div className="ach-desc">{a.description}</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Командные достижения */}
                {team.length > 0 && (
                    <section className="ach-section">
                        <h3>Командные</h3>
                        <ul className="ach-list">
                            {team.map(a => (
                                <li key={a.title}>
                                    <span className="ach-emoji">{a.emoji}</span>
                                    <span className="ach-title">{a.title}</span>
                                    <span className="ach-count">×{a.count}</span>
                                    <div className="ach-desc">{a.description}</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

export default PlayerProfile;
