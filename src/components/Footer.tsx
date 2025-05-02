import React from 'react';
import '../styles/Footer.css';



const Footer = () => {
    const commit = process.env.VITE_COMMIT_SHA?.slice(0, 7);
    const lastDeployed = `Commit: ${commit}`;

    return (
        <footer className="app-footer">
            <span>ballrush © | {lastDeployed}</span>
        </footer>
    );
};

export default Footer;
