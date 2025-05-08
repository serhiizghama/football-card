// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/UserProfile.css';
import avatarImg from '../assets/avatar.png';

const UserProfile = () => {
    const { userId: rawUserId, groupId: rawGroupId } = useParams();
    const userId = Number(rawUserId);
    const groupId = Number(rawGroupId);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://api.ballrush.online/user/${userId}/group/${groupId}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load data');
                return res.json();
            })
            .then(data => setUser(data))
            .catch(err => console.error('Error:', err));
    }, [userId, groupId]);

    if (!user) {
        return <div className="loading">Loading profile…</div>;
    }

    // Calculate win percentage
    const winPercentage = user.totalGames > 0
        ? ((user.wins / user.totalGames) * 100).toFixed(1)
        : '0.0';

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
                    Group:{' '}
                    <Link to={`/group/${groupId}`} className="group-link">
                        {user.groupName}
                    </Link>
                </p>
            </header>

            <div className="season-stats">
                <h2>Overall Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">Events</span>
                        <span className="stat-value">{user.eventsPlayed}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Games</span>
                        <span className="stat-value">{user.totalGames}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Wins</span>
                        <span className="stat-value">{user.wins}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Losses</span>
                        <span className="stat-value">{user.losses}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Draws</span>
                        <span className="stat-value">{user.draws}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Goals For</span>
                        <span className="stat-value">{user.goalsFor}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Goals Against</span>
                        <span className="stat-value">{user.goalsAgainst}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Win %</span>
                        <span className="stat-value">{winPercentage}%</span>
                    </div>
                </div>
            </div>

            <div className="achievements">
                <h2>Achievements</h2>

                {user.achievements.length > 0 ? (
                    <section className="ach-section">
                        <ul className="ach-list">
                            {user.achievements.map(a => (
                                <li key={a.title}>
                                    <span className="ach-emoji">{a.emoji}</span>
                                    <span className="ach-title">{a.title}</span>
                                    <span className="ach-count">×{a.count}</span>
                                    <div className="ach-desc">{a.description}</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : (
                    <p className="no-ach">This user has no achievements.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
