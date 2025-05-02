import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTelegram from '../hooks/useTelegram';
import '../styles/Header.css';

const Header: React.FC = () => {
    const { user } = useTelegram();
    const location = useLocation();
    const navigate = useNavigate();

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const isRoot = location.pathname === '/';
    console.log('Telegram user:', user);


    return (
        <header className={`header ${showHeader ? 'visible' : 'hidden'}`}>
            <div className="header-content">
                {!isRoot && (
                    <button className="back-button" onClick={() => navigate(-1)}>
                        &laquo;
                    </button>
                )}
                <div className="header-title">BallRush</div>
                {user && (
                    <div className="user-avatar">
                        {user.photo_url ? (
                            <img src={user.photo_url} alt="user" />
                        ) : (
                            <div className="user-placeholder">
                                {user.username?.[0]?.toUpperCase() ?? 'U'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
