import React, { useState, useEffect } from 'react';
import '../styles/GroupProfile.css';

const GroupProfile = ({ groupId }) => {
    const [groupName, setGroupName] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        // 1) Сначала подгружаем список групп, чтобы достать groupName
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

        // 2) Затем подгружаем статистику по сезонам конкретной группы
        fetch(`https://api.ballrush.online/group/${groupId}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setSeasons(data);
                if (data.length) setSelectedSeason(data[0].seasonName);
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
                            <th>Игрок</th>
                            <th>Игр</th>
                            <th>Побед</th>
                            <th>Пораж.</th>
                            <th>Skill</th>
                            <th>Ачивок</th>
                        </tr>
                    </thead>
                    <tbody>
                        {current.participants.map(p => {
                            const games = p.wins + p.losses + p.draws;
                            return (
                                <tr key={p.userId}>
                                    <td className="gp-player">{p.name}</td>
                                    <td>{games}</td>
                                    <td>{p.wins}</td>
                                    <td>{p.losses}</td>
                                    <td>{p.skill.toFixed(1)}</td>
                                    <td>{p.achievements.length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GroupProfile;
