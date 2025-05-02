import React from 'react';
import '../styles/Footer.css';



const Footer = () => {
    const commit = import.meta.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
    const lastDeployed = `Commit: ${commit}`;

    return (
        <footer className="app-footer">
            <span>ballrush © | {lastDeployed}</span>
        </footer>
    );
};

export default Footer;
