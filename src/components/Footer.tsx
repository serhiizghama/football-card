import React from 'react';
import '../styles/Footer.css';



const Footer = () => {
    const commit1 = import.meta.env.VITE_COMMIT_SHA?.slice(0, 7);
    const commit2 = process.env.VITE_COMMIT_SHA?.slice(0, 7);
    const lastDeployed = `Commit: ${commit1} | ${commit2}`;

    return (
        <footer className="app-footer">
            <span>ballrush © | {lastDeployed}</span>
        </footer>
    );
};

export default Footer;
