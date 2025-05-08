// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/UserProfile.css';
import avatarImg from '../assets/avatar.png';

/**
 * Группирует достижения по title, считая количество повторов
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
    const { userId: rawUserId, groupId: rawGroupId } = useParams();
    const userId = Number(rawUserId);
    const groupId = Number(rawGroupId);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://api.ballrush.online/user/${userId}/group/${groupId}`)
            .then(res => {
                if (!res.ok) throw new Error('Ошибка загрузки данных');
                return res.json();
            })
            .then(data => setUser(data))
            .catch(err => console.error('Ошибка:', err));
    }, [userId, groupId]);

    if (!user) {
        return <div className="loading">Загрузка профиля…</div>;
    }

    // Берём достижения из первого сезона (или пустой массив)
    const season = user.seasons?.[0] ?? { achievements: [] };
    const personal = groupAchievements(
        season.achievements.filter(a => a.type === 'personal')
    );
    const team = groupAchievements(
        season.achievements.filter(a => a.type === 'team')
    );

    return (
        <div className="profile-container">
            <header className="profile-header profile-header--gradient">
                <div className="avatar-wrapper">
                    <img
                        className="profile-avatar"
                        src={avatarImg}
                        alt="User Avatar"
                    />
                </div>
                <h1>{user.username}</h1>
                <p>
                    Группа:{' '}
                    <Link to={`/group/${groupId}`} className="group-link">
                        {user.groupName}
                    </Link>
                </p>
            </header>

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

                {personal.length === 0 && team.length === 0 && (
                    <p className="no-ach">У пользователя нет достижений.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
