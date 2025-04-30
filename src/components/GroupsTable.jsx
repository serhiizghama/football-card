import React, { useState, useEffect } from 'react';
import '../styles/GroupsTable.css';

export default function GroupsTable() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.ballrush.online/groups')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Загрузка списка групп…</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="groups-table-container">
            <h1 className="groups-title">Сравнение групп</h1>
            <div className="table-wrapper">
                <table className="groups-table">
                    <thead>
                        <tr>
                            <th>Группа</th>
                            <th>Сезонов</th>
                            <th>Вечеров</th>
                            <th>Матчей</th>
                            <th>Участников</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(g => (
                            <tr key={g.groupId}>
                                <td className="group-name">{g.groupName}</td>
                                <td>{g.seasonsCount}</td>
                                <td>{g.eventsCount}</td>
                                <td>{g.matchesCount}</td>
                                <td>{g.participantsCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
