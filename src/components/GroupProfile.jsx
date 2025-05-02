import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/GroupProfile.css';


const GroupProfile = () => {
    const getRankEmoji = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return '';
    };

    const seasonOrder = ['Winter', 'Spring', 'Summer', 'Autumn'];

    const sortSeasons = (list) => {
        return [...list].sort((a, b) => {
            const [aName, aYear] = a.seasonName.split(' ');
            const [bName, bYear] = b.seasonName.split(' ');
            const yearDiff = parseInt(aYear) - parseInt(bYear);
            if (yearDiff !== 0) return yearDiff;
            return seasonOrder.indexOf(aName) - seasonOrder.indexOf(bName);
        });
    };


    const { groupId: rawGroupId } = useParams();
    const groupId = +rawGroupId;

    const [groupName, setGroupName] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        // 1) Подгружаем список всех групп, чтобы вытащить имя
        fetch('https://api.ballrush.online/groups')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(list => {
                const g = list.find(item => item.groupId === groupId);
                setGroupName(g ? g.groupName : `Group ${groupId}`);
            })
            .catch(() => {
                setGroupName(`Group ${groupId}`);
            });

        // 2) Подгружаем статистику по сезонам конкретной группы
        fetch(`https://api.ballrush.online/group/${groupId}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                const sorted = sortSeasons(data);
                setSeasons(sorted);
                if (sorted.length) {
                    const last = sorted[sorted.length - 1];
                    setSelectedSeason(last.seasonName);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [groupId]);

    if (loading) return <div className="gp-loading">Загрузка группы…</div>;
    if (error) return <div className="gp-error">Ошибка: {error}</div>;
    if (!seasons.length) return <div className="gp-no-data">Нет данных по сезонам</div>;

    const current = seasons.find(s => s.seasonName === selectedSeason);

    // Считаем score и сортируем участников
    const sortedParticipants = [...current.participants]
        .map(p => {
            const games = p.wins + p.losses + p.draws;
            const score = p.wins * 3 + p.draws * 1 + p.losses * -1;
            return { ...p, games, score };
        })
        .sort((a, b) => b.score - a.score);

    return (
        <div className="gp-container">
            <h1 className="gp-title">{groupName}</h1>

            <div className="gp-seasons">
                {seasons.map(s => (
                    <button
                        key={s.seasonName}
                        className={`gp-season-btn ${s.seasonName === selectedSeason ? 'active' : ''}`}
                        onClick={() => setSelectedSeason(s.seasonName)}
                    >
                        {s.seasonName}
                    </button>
                ))}
            </div>

            <div className="gp-table-wrap">
                <table className="gp-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Игрок</th>
                            <th>Игр</th>
                            <th>Побед</th>
                            <th>Пораж.</th>
                            <th>Skill</th>
                            <th>Ачивок</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedParticipants.map((p, idx) => (
                            <tr key={p.userId}>
                                <td className="gp-index">
                                    {getRankEmoji(idx)} {idx + 1}
                                </td>
                                <td className="gp-player">
                                    <Link to={`/user/${p.userId}/group/${groupId}`} className="user-link">
                                        {p.name}
                                    </Link>
                                </td>
                                <td>{p.games}</td>
                                <td>{p.wins}</td>
                                <td>{p.losses}</td>
                                <td>{p.skill.toFixed(1)}</td>
                                <td>{p.achievements.length}</td>
                                <td className="gp-score">{p.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GroupProfile;
