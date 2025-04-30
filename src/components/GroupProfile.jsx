// src/components/GroupProfile.jsx
import React, { useState, useEffect } from 'react';
import '../styles/GroupProfile.css';

export default function GroupProfile({ groupId }) {
    const [groupName, setGroupName] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // fetch list of seasons + group info
    useEffect(() => {
        setLoading(true);
        fetch(`https://api.ballrush.online/group/${groupId}/seasons`)
            .then(r => {
                if (!r.ok) throw new Error('Failed to load seasons');
                return r.json();
            })
            .then(data => {
                setGroupName(data.groupName);
                setSeasons(data.seasons);
                if (data.seasons.length) setSelectedSeason(data.seasons[0]);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [groupId]);

    // fetch stats when season changes
    useEffect(() => {
        if (!selectedSeason) return;
        setLoading(true);
        fetch(
            `https://api.ballrush.online/group/${groupId}/season/${encodeURIComponent(
                selectedSeason
            )}/stats`
        )
            .then(r => {
                if (!r.ok) throw new Error('Failed to load stats');
                return r.json();
            })
            .then(data => {
                setStats(data.participants);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [groupId, selectedSeason]);

    if (loading) return <div className="gp-loading">Loading…</div>;
    if (error) return <div className="gp-error">{error}</div>;

    return (
        <div className="gp-container">
            <h1 className="gp-title">{groupName}</h1>

            <div className="gp-seasons">
                {seasons.map(sea => (
                    <button
                        key={sea}
                        className={
                            sea === selectedSeason ? 'gp-season-btn active' : 'gp-season-btn'
                        }
                        onClick={() => setSelectedSeason(sea)}
                    >
                        {sea}
                    </button>
                ))}
            </div>

            <div className="gp-table-wrapper">
                <table className="gp-table">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>G</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>Pts</th>
                            <th>EFF</th>
                            <th>Skill</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(p => (
                            <tr key={p.userId}>
                                <td className="gp-player">
                                    {p.username.slice(0, 1).toUpperCase()}
                                    <span className="gp-player-name">{p.username}</span>
                                </td>
                                <td>{p.stats.games}</td>
                                <td>{p.stats.wins}</td>
                                <td>{p.stats.draws}</td>
                                <td>{p.stats.losses}</td>
                                <td>{p.stats.points}</td>
                                <td>{p.stats.efficiency}</td>
                                <td>{p.stats.skill}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
