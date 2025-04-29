import React, { useState, useEffect } from 'react';
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

    // TODO: получить userId и groupId динамически (props, router, context…)
    const userId = 277364372;
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
                <ul>
                    <li>Игры: {selectedSeason.games}</li>
                    <li>Победы: {selectedSeason.wins}</li>
                    <li>Поражения: {selectedSeason.losses}</li>
                    <li>Ничьи: {selectedSeason.draws}</li>
                    <li>Очки: {selectedSeason.points}</li>
                    <li>EFF: {selectedSeason.efficiency}</li>
                    <li>Skill: {selectedSeason.skill}</li>
                </ul>
            </div>

            <div className="achievements">
                <h2>Достижения</h2>

                <section className="ach-section">
                    <h3>Личные</h3>
                    {personal.length === 0 ? (
                        <p className="no-ach">Нет личных достижений</p>
                    ) : (
                        <ul>
                            {personal.map(a => (
                                <li key={a.title}>
                                    <span className="ach-emoji">{a.emoji}</span>
                                    <strong>{a.title}</strong>
                                    {a.count > 1 && <em>×{a.count}</em>}
                                    <div className="ach-desc">{a.description}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="ach-section">
                    <h3>Командные</h3>
                    {team.length === 0 ? (
                        <p className="no-ach">Нет командных достижений</p>
                    ) : (
                        <ul>
                            {team.map(a => (
                                <li key={a.title}>
                                    <span className="ach-emoji">{a.emoji}</span>
                                    <strong>{a.title}</strong>
                                    {a.count > 1 && <em>×{a.count}</em>}
                                    <div className="ach-desc">{a.description}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
};

export default PlayerProfile;
