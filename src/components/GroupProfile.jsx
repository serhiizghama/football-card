import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/GroupProfile.css';

import {
    PiCalendarBold,
    PiTargetBold,
    PiSoccerBallBold,
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
    const sortSeasons = (list) =>
        [...list].sort((a, b) => {
            const [aName, aYear] = a.seasonName.split(' ');
            const [bName, bYear] = b.seasonName.split(' ');
            const yearDiff = parseInt(aYear) - parseInt(bYear);
            if (yearDiff !== 0) return yearDiff;
            return seasonOrder.indexOf(aName) - seasonOrder.indexOf(bName);
        });

    const { groupId: rawGroupId } = useParams();
    const groupId = +rawGroupId;

    const [groupName, setGroupName] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [seasonInfo, setSeasonInfo] = useState(null);
    const [lastGamesSummary, setLastGamesSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1) При маунте: fetch /group/:groupId/profile
    useEffect(() => {
        setLoading(true);
        fetch(`https://api.ballrush.online/group/${groupId}/profile`)
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((profile) => {
                const sorted = sortSeasons(profile.seasons);
                setSeasons(sorted);
                setGroupName(sorted[0]?.groupName || `Group ${groupId}`);
                setLastGamesSummary(profile.lastGamesSummary);

                // Изначально — последний сезон
                if (sorted.length) {
                    setSelectedSeason(sorted[sorted.length - 1].seasonName);
                } else {
                    setSelectedSeason('All Seasons');
                }

                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [groupId]);

    // 2) При переключении selectedSeason — fetch /season-info/:groupId/:selectedSeason
    useEffect(() => {
        // игнорим «All Seasons» и «Last 100 Games»
        if (
            !selectedSeason ||
            selectedSeason === 'All Seasons' ||
            selectedSeason === 'Last 100 Games'
        ) {
            setSeasonInfo(null);
            return;
        }

        fetch(
            `https://api.ballrush.online/season-info/${groupId}/${encodeURIComponent(
                selectedSeason
            )}`
        )
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((info) => setSeasonInfo(info))
            .catch(() => setSeasonInfo(null));
    }, [groupId, selectedSeason]);

    // 3) Собираем список участников под текущую вкладку
    const participants = useMemo(() => {
        if (selectedSeason === 'All Seasons') {
            const map = {};
            seasons.forEach((s) =>
                s.participants.forEach((p) => {
                    if (!map[p.userId]) {
                        map[p.userId] = { ...p };
                    } else {
                        const ex = map[p.userId];
                        ex.wins += p.wins;
                        ex.losses += p.losses;
                        ex.draws += p.draws;
                        ex.achievements = [...ex.achievements, ...p.achievements];
                    }
                })
            );
            return Object.values(map);
        }

        if (selectedSeason === 'Last 100 Games') {
            return lastGamesSummary.map((p) => ({
                userId: p.userId,
                name: p.name,
                wins: p.wins,
                losses: p.losses,
                draws: p.draws,
                achievementsCount: p.achievementsCount,
            }));
        }

        const curr = seasons.find((s) => s.seasonName === selectedSeason);
        return curr ? [...curr.participants] : [];
    }, [selectedSeason, seasons, lastGamesSummary]);

    // 4) Считаем score и сортируем
    const sortedParticipants = useMemo(() => {
        return participants
            .map((p) => {
                const games = p.wins + p.losses + p.draws;
                const baseScore = games > 0 ? (p.wins * 3 + p.draws) / games : 0;
                const activityWeight = Math.log2(games + 1);
                return {
                    ...p,
                    games,
                    score: Number((baseScore * activityWeight).toFixed(2)),
                };
            })
            .sort((a, b) => b.score - a.score);
    }, [participants]);

    if (loading) return <div className="gp-loading">Загрузка…</div>;
    if (error) return <div className="gp-error">Ошибка: {error}</div>;
    if (!seasons.length && selectedSeason !== 'Last 100 Games')
        return <div className="gp-no-data">Нет данных по сезонам</div>;

    const showInfo =
        seasonInfo &&
        selectedSeason !== 'All Seasons' &&
        selectedSeason !== 'Last 100 Games';

    return (
        <div className="gp-container">
            <h1 className="gp-title">{groupName}</h1>

            <div className="gp-seasons">
                <button
                    key="all"
                    className={`gp-season-btn ${selectedSeason === 'All Seasons' ? 'active' : ''
                        }`}
                    onClick={() => setSelectedSeason('All Seasons')}
                >
                    All Seasons
                </button>
                <button
                    key="last100"
                    className={`gp-season-btn ${selectedSeason === 'Last 100 Games' ? 'active' : ''
                        }`}
                    onClick={() => setSelectedSeason('Last 100 Games')}
                >
                    100 Games
                </button>
                {seasons.map((s) => (
                    <button
                        key={s.seasonName}
                        className={`gp-season-btn ${s.seasonName === selectedSeason ? 'active' : ''
                            }`}
                        onClick={() => setSelectedSeason(s.seasonName)}
                    >
                        {s.seasonName}
                    </button>
                ))}
            </div>

            {showInfo && (
                <div className="season-info-line">
                    <span className="season-info-item">
                        <PiCalendarBold className="season-info-icon" />
                        {new Date(seasonInfo.startDate).toLocaleDateString('ru-RU')}–
                        {new Date(seasonInfo.endDate).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="season-info-item">
                        <PiTargetBold className="season-info-icon" /> {seasonInfo.eventsCount}{' '}
                        events
                    </span>
                    <span className="season-info-item">
                        <PiSoccerBallBold className="season-info-icon" />{' '}
                        {seasonInfo.matchesCount} matches
                    </span>
                    <span className="season-info-item">
                        <PiCircleBold className="season-info-icon" />{' '}
                        {seasonInfo.status === 'in_progress'
                            ? 'In progress'
                            : seasonInfo.status === 'ended'
                                ? 'Finished'
                                : 'Upcoming'}
                    </span>
                </div>
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
                                    <Link
                                        to={`/user/${p.userId}/group/${groupId}`}
                                        className="user-link"
                                    >
                                        {p.name || p.userId}
                                    </Link>
                                </td>
                                <td>{p.games}</td>
                                <td>{p.wins}</td>
                                <td>{p.losses}</td>
                                <td>{p.draws}</td>
                                <td>{p.skill ? p.skill.toFixed(1) : '-'}</td>
                                <td>{p.achievementsCount ?? p.achievements.length}</td>
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
