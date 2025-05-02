import React from 'react';
import '../styles/Footer.css';



const Footer = () => {
    const commit = import.meta.env.VITE_COMMIT_SHA?.slice(0, 7) ?? 'dev';
    const date = import.meta.env.VITE_DEPLOY_DATE ?? 'unknown';
    const branch = import.meta.env.VITE_BRANCH ?? 'main';

    return (
        <footer className="app-footer">
            <span>ballrush © | {commit} | {date} | {branch}</span>
        </footer>
    );
};

export default Footer;
