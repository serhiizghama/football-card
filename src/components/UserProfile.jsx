// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    FaFutbol,          // Игры
    FaTrophy,          // Победы
    FaTimesCircle,     // Поражения
    FaHandshake,       // Ничьи
    FaStar,            // Очки
    FaTachometerAlt,   // EFF
    FaBrain            // Skill
} from 'react-icons/fa';
import '../styles/UserProfile.css';

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

const UserProfile = () => {
    // Берём параметры userId и groupId из URL
    const { userId: rawUserId, groupId: rawGroupId } = useParams();
    const userId = Number(rawUserId);
    const groupId = Number(rawGroupId);

    const [user, setUser] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    useEffect(() => {
        fetch(`https://api.ballrush.online/user/${userId}/group/${groupId}`)
            .then(res => {
                if (!res.ok) throw new Error('Ошибка загрузки данных');
                return res.json();
            })
            .then(data => {
                setUser(data);
                if (data.seasons.length) {
                    setSelectedSeason(data.seasons[0]);
                }
            })
            .catch(err => {
                console.error('Ошибка:', err);
            });
    }, [userId, groupId]);

    if (!user) {
        return <div className="loading">Загрузка профиля…</div>;
    }
    if (!selectedSeason) {
        return <div className="loading">У пользователя нет сезонов</div>;
    }

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
                    <li className="stat-button">
                        <FaFutbol className="stat-icon-large" />
                        <div className="stat-content">
                            <span className="stat-label">Игры</span>
                            <span className="stat-value">{selectedSeason.games}</span>
                        </div>
                    </li>
                    <li className="stat-button">
                        <FaTrophy className="stat-icon-large" />
                        <div className="stat-content">
                            <span className="stat-label">Победы</span>
                            <span className="stat-value">{selectedSeason.wins}</span>
                        </div>
                    </li>
                    <li className="stat-button">
                        <FaTimesCircle className="stat-icon-large" />
                        <div className="stat-content">
                            <span className="stat-label">Поражения</span>
                            <span className="stat-value">{selectedSeason.losses}</span>
                        </div>
                    </li>
                    <li className="stat-button">
                        <FaHandshake className="stat-icon-large" />
                        <div className="stat-content">
                            <span className="stat-label">Ничьи</span>
                            <span className="stat-value">{selectedSeason.draws}</span>
                        </div>
                    </li>
                    <li className="stat-button">
                        <FaStar className="stat-icon-large" />
                        <div className="stat-content">
                            <span className="stat-label">Очки</span>
                            <span className="stat-value">{selectedSeason.points}</span>
                        </div>
                    </li>
                    <li className="stat-button">
                        <FaTachometerAlt className="stat-icon-large" />
                        <div className="stat-content">
                            <span className="stat-label">EFF</span>
                            <span className="stat-value">{selectedSeason.efficiency}</span>
                        </div>
                    </li>
                    <li className="stat-button">
                        <FaBrain className="stat-icon-large" />
                        <div className="stat-content">
                            <span className="stat-label">Skill</span>
                            <span className="stat-value">{selectedSeason.skill}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="achievements">
                <h2>Достижения</h2>

                {personal.length > 0 && (
                    <section className="ach-section">
                        <h3>Личные</h3>
                        <ul className="ach-list">
                            {personal.map(a => (
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

export default UserProfile;
