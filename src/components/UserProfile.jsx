// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FaFutbol,
    FaTrophy,
    FaTimesCircle,
    FaHandshake,
    FaStar,
    FaTachometerAlt,
    FaBrain
} from 'react-icons/fa';
import '../styles/UserProfile.css';

function groupAchievements(achs) {
    const map = {};
    achs.forEach(a => {
        const key = a.title;
        if (!map[key]) {
            map[key] = { ...a, count: 0 };
        }
        map[key].count += a.count ?? 1;
    });
    return Object.values(map);
}

const UserProfile = () => {
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
                if (data.seasons.length) setSelectedSeason(data.seasons[0]);
            })
            .catch(err => console.error('Ошибка:', err));
    }, [userId, groupId]);

    if (!user) return <div className="loading">Загрузка профиля…</div>;
    if (!selectedSeason) return <div className="loading">У пользователя нет сезонов</div>;

    const personal = groupAchievements(
        selectedSeason.achievements.filter(a => a.type === 'personal')
    );
    const team = groupAchievements(
        selectedSeason.achievements.filter(a => a.type === 'team')
    );

    return (
        <div className="profile-container">
            {/* Градиентная шапка */}
            <header className="profile-header gradient-header">
                <div className="avatar-wrapper">
                    <img
                        src={user.avatarUrl || '/default-avatar.png'}
                        alt={user.username}
                        className="avatar"
                    />
                </div>
                <h1 className="username">{user.username}</h1>
                <p className="group-info">
                    Группа:{' '}
                    <Link to={`/group/${groupId}`} className="group-link underline">
                        {user.groupName}
                    </Link>
                </p>
            </header>

            {/* Селектор сезона */}
            <div className="season-selector">
                {user.seasons.map(s => (
                    <button
                        key={s.season}
                        className={`season-btn ${s.season === selectedSeason.season ? 'active' : ''}`}
                        onClick={() => setSelectedSeason(s)}
                    >
                        {s.season}
                    </button>
                ))}
            </div>

            {/* Статистика сезона */}
            <section className="season-stats">
                <h2 className="stats-title">Статистика сезона: {selectedSeason.season}</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <FaFutbol className="stat-icon" />
                        <div className="stat-label">Игры</div>
                        <div className="stat-value">{selectedSeason.games}</div>
                    </div>
                    <div className="stat-card">
                        <FaTrophy className="stat-icon" />
                        <div className="stat-label">Победы</div>
                        <div className="stat-value">{selectedSeason.wins}</div>
                    </div>
                    <div className="stat-card">
                        <FaTimesCircle className="stat-icon" />
                        <div className="stat-label">Поражения</div>
                        <div className="stat-value">{selectedSeason.losses}</div>
                    </div>
                    <div className="stat-card">
                        <FaHandshake className="stat-icon" />
                        <div className="stat-label">Ничьи</div>
                        <div className="stat-value">{selectedSeason.draws}</div>
                    </div>
                    <div className="stat-card">
                        <FaStar className="stat-icon" />
                        <div className="stat-label">Очки</div>
                        <div className="stat-value">{selectedSeason.points}</div>
                    </div>
                    <div className="stat-card">
                        <FaTachometerAlt className="stat-icon" />
                        <div className="stat-label">EFF</div>
                        <div className="stat-value">{selectedSeason.efficiency}</div>
                    </div>
                    <div className="stat-card">
                        <FaBrain className="stat-icon" />
                        <div className="stat-label">Skill</div>
                        <div className="stat-value">{selectedSeason.skill}</div>
                    </div>
                </div>
            </section>

            {/* Достижения */}
            <section className="achievements">
                <h2>Достижения</h2>

                {personal.length > 0 && (
                    <div className="ach-section">
                        <h3>Личные</h3>
                        <div className="ach-list">
                            {personal.map(a => (
                                <div className="ach-card" key={a.title}>
                                    <span className="ach-emoji">{a.emoji}</span>
                                    <div className="ach-info">
                                        <span className="ach-title">{a.title}</span>
                                        <span className="ach-count">×{a.count}</span>
                                    </div>
                                    <p className="ach-desc">{a.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {team.length > 0 && (
                    <div className="ach-section">
                        <h3>Командные</h3>
                        <div className="ach-list">
                            {team.map(a => (
                                <div className="ach-card" key={a.title}>
                                    <span className="ach-emoji">{a.emoji}</span>
                                    <div className="ach-info">
                                        <span className="ach-title">{a.title}</span>
                                        <span className="ach-count">×{a.count}</span>
                                    </div>
                                    <p className="ach-desc">{a.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default UserProfile;