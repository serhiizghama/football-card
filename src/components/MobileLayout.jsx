import React from 'react';
import '../styles/MobileLayout.css';

const MobileLayout = ({ children }) => {
  return (
    <div className="mobile-layout">
      {children}
      <nav className="bottom-menu">
        <a href="/" className="menu-button">
          <i className="fas fa-home"></i>
          <span>Главная</span>
        </a>
        <a href="/search" className="menu-button">
          <i className="fas fa-search"></i>
          <span>Поиск</span>
        </a>
        <a href="/favorites" className="menu-button">
          <i className="fas fa-futbol"></i>
          <span>Матчи</span>
        </a>
        <a href="/profile" className="menu-button">
          <i className="fas fa-user"></i>
          <span>Профиль</span>
        </a>
      </nav>
    </div>
  );
};

export default MobileLayout; 