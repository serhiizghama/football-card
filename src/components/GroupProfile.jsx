import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/GroupProfile.css';

import {
    PiCalendarBold,
    PiTargetBold,
    PiSoccerBallBold,
    PiUsersBold,
    PiCircleBold,
} from 'react-icons/pi';

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
    const [seasonInfo, setSeasonInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.ballrush.online/groups')
            .then(res => res.json())
            .then(list => {
                const g = list.find(item => item.groupId === groupId);
                setGroupName(g ? g.groupName : `Group ${groupId}`);
            })
            .catch(() => {
                setGroupName(`Group ${groupId}`);
            });

        fetch(`https://api.ballrush.online/group/${groupId}`)
            .then(res => res.json())
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

    // Загружаем информацию о сезоне
    useEffect(() => {
        if (!selectedSeason) return;

        fetch(`https://api.ballrush.online/season-info/${groupId}/${selectedSeason}`)
            .then(res => res.json())
            .then(setSeasonInfo)
            .catch(() => setSeasonInfo(null));
    }, [groupId, selectedSeason]);

    if (loading) return <div className="gp-loading">Загрузка группы…</div>;
    if (error) return <div className="gp-error">Ошибка: {error}</div>;
    if (!seasons.length) return <div className="gp-no-data">Нет данных по сезонам</div>;

    const current = seasons.find(s => s.seasonName === selectedSeason);

    const sortedParticipants = [...current.participants]
        .map(p => {
            const games = p.wins + p.losses + p.draws;
            const rawScore = p.wins * 3 + p.draws;
            const score = games > 0 ? rawScore / games : 0;
            return { ...p, games, score: Number(score.toFixed(2)) };
        })
        .sort((a, b) => b.score - a.score);

    // 🧾 Формируем строку информации о сезоне
    const seasonInfoText = seasonInfo ? (() => {
        const start = new Date(seasonInfo.startDate).toLocaleDateString('ru-RU');
        const end = new Date(seasonInfo.endDate).toLocaleDateString('ru-RU');

        let statusColor = 'var(--accent)';
        let statusText = 'Upcoming';

        if (seasonInfo.status === 'in_progress') {
            statusColor = 'var(--accent)';
            statusText = 'In progress';
        } else if (seasonInfo.status === 'ended') {
            statusColor = '#f44336';
            statusText = 'Finished';
        }

        return (
            <div className="season-info-line">
                <span className="season-info-item">
                    <PiCalendarBold className="season-info-icon" />
                    {start}–{end}
                </span>
                <span className="season-info-item">
                    <PiTargetBold className="season-info-icon" />
                    {seasonInfo.eventsCount} events
                </span>
                <span className="season-info-item">
                    <PiSoccerBallBold className="season-info-icon" />
                    {seasonInfo.matchesCount} matches
                </span>
                {/* <span className="season-info-item">
                    <PiUsersBold className="season-info-icon" />
                    {seasonInfo.playersCount} players
                </span> */}
                <span className="season-info-item">
                    <PiCircleBold className="season-info-icon" />
                    {statusText}
                </span>
            </div>
        );
    })() : null;

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

            {seasonInfoText && (
                <div className="season-info-line">{seasonInfoText}</div>
            )}

            <div className="gp-table-wrap">
                <table className="gp-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Игрок</th>
                            <th>Игр</th>
                            <th>Побед</th>
                            <th>Пораж.</th>
                            <th>Ничии</th>
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
                                <td>{p.draws}</td>
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
