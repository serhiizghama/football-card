// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupsTable from './components/GroupsTable';
import GroupProfile from './components/GroupProfile';
import UserProfile from './components/UserProfile';
import useTelegram from './hooks/useTelegram';
import './App.css';

function App() {
  const { user, isLoading: isTelegramLoading } = useTelegram();

  if (isTelegramLoading) {
    return (
      <div className="loading-container">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Главная страница со списком групп */}
        <Route path="/" element={<GroupsTable />} />

        <Route path="/group/:groupId" element={<GroupProfile />} />
        <Route path="/user/:userId/groupId/:groupId" element={<UserProfile />} />

        {/* По желанию: 404 */}
        <Route path="*" element={<p>Page not found 404 xD</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
