import React, { useState, useEffect, useMemo } from 'react';
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

    // Собираем список участников в зависимости от выбранного сезона или всех сезонов
    const participants = useMemo(() => {
        if (selectedSeason === 'All Seasons') {
            const map = {};
            seasons.forEach(s => {
                s.participants.forEach(p => {
                    if (!map[p.userId]) {
                        map[p.userId] = { ...p };
                    } else {
                        const existing = map[p.userId];
                        existing.wins += p.wins;
                        existing.losses += p.losses;
                        existing.draws += p.draws;
                        existing.achievements = [...existing.achievements, ...p.achievements];
                    }
                });
            });
            return Object.values(map);
        }
        const current = seasons.find(s => s.seasonName === selectedSeason);
        return current ? [...current.participants] : [];
    }, [selectedSeason, seasons]);

    // Рассчитываем и сортируем рейтинг
    const sortedParticipants = useMemo(() => {
        return participants
            .map(p => {
                const games = p.wins + p.losses + p.draws;
                const baseScore = games > 0 ? (p.wins * 3 + p.draws) / games : 0;
                const activityWeight = Math.log2(games + 1);
                const finalScore = Number((baseScore * activityWeight).toFixed(2));
                return { ...p, games, score: finalScore };
            })
            .sort((a, b) => b.score - a.score);
    }, [participants]);

    // Загрузки данных
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
                    setSelectedSeason(sorted[sorted.length - 1].seasonName);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [groupId]);

    useEffect(() => {
        if (!selectedSeason || selectedSeason === 'All Seasons') return;

        fetch(`https://api.ballrush.online/season-info/${groupId}/${selectedSeason}`)
            .then(res => res.json())
            .then(setSeasonInfo)
            .catch(() => setSeasonInfo(null));
    }, [groupId, selectedSeason]);

    if (loading) return <div className="gp-loading">Загрузка группы…</div>;
    if (error) return <div className="gp-error">Ошибка: {error}</div>;
    if (!seasons.length) return <div className="gp-no-data">Нет данных по сезонам</div>;

    // Информация о сезоне (только для одного сезона)
    const seasonInfoText = (seasonInfo && selectedSeason !== 'All Seasons') ? (
        <div className="season-info-line">
            <span className="season-info-item">
                <PiCalendarBold className="season-info-icon" /> {new Date(seasonInfo.startDate).toLocaleDateString('ru-RU')}–{new Date(seasonInfo.endDate).toLocaleDateString('ru-RU')}
            </span>
            <span className="season-info-item">
                <PiTargetBold className="season-info-icon" /> {seasonInfo.eventsCount} events
            </span>
            <span className="season-info-item">
                <PiSoccerBallBold className="season-info-icon" /> {seasonInfo.matchesCount} matches
            </span>
            <span className="season-info-item">
                <PiCircleBold className="season-info-icon" /> {seasonInfo.status === 'in_progress' ? 'In progress' : seasonInfo.status === 'ended' ? 'Finished' : 'Upcoming'}
            </span>
        </div>
    ) : null;

    return (
        <div className="gp-container">
            <h1 className="gp-title">{groupName}</h1>

            <div className="gp-seasons">
                <button
                    key="all"
                    className={`gp-season-btn ${selectedSeason === 'All Seasons' ? 'active' : ''}`}
                    onClick={() => setSelectedSeason('All Seasons')}
                >
                    Все сезоны
                </button>
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

            {seasonInfoText}

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
                                <td className="gp-index">{getRankEmoji(idx)} {idx + 1}</td>
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