// src/components/GroupProfile.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/GroupProfile.css';

export default function GroupProfile() {
    const { groupId } = useParams();

    return (
        <div className="group-profile-container">
            <h1 className="group-profile-title">Group Profile</h1>
            <p>🏷️ Group ID: <strong>{groupId}</strong></p>
            <p>This is a placeholder. Your real GroupProfile will go here.</p>
            <Link to="/" className="back-link">← Back to Groups List</Link>
        </div>
    );
}
