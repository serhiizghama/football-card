import React, { useEffect, useState } from 'react';
import '../styles/WelcomePage.css';

const WelcomePage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500); // Small delay before transition
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="football-logo">
          <div className="football">
            <div className="football-pattern"></div>
          </div>
        </div>
        <h1 className="welcome-title">Football Cards</h1>
        <div className="loading-bar-container">
          <div 
            className="loading-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">Loading amazing football content...</p>
      </div>
    </div>
  );
};

export default WelcomePage; 