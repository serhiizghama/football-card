import React, { useEffect, useState } from 'react';
import '../styles/global.css';

const WelcomePage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds
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
    <div className="container">
      <div className="card">
        <div className="card-header">Football Cards</div>
        <div className="card-content">
          <div className="loading-bar-container">
            <div 
              className="loading-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="loading-text">Loading amazing football content...</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage; 