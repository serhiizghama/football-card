import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTelegram from '../hooks/useTelegram';
import '../styles/Header.css';

const Header: React.FC = () => {
    const { user } = useTelegram();
    const location = useLocation();
    const navigate = useNavigate();

    const isRoot = location.pathname === '/';

    return (
        <header className="header">
            <div className="header-content">
                {!isRoot ? (
                    <button className="back-button" onClick={() => navigate(-1)}>
                        &laquo;
                    </button>
                ) : (
                    <div className="side-space" />
                )}

                <div className="header-center" onClick={() => navigate('/')}>
                    <span className="logo-main">ballrush</span>
                    <span className="logo-dot">.online</span>
                </div>


                {user ? (
                    <div className="user-avatar">
                        {user.photo_url ? (
                            <img src={user.photo_url} alt="user" />
                        ) : (
                            <div className="user-placeholder">
                                {user.username?.[0]?.toUpperCase() ?? 'U'}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="user-placeholder-space" />
                )}
            </div>
        </header>
    );
};

export default Header;
