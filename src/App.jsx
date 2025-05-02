import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupsTable from './components/GroupsTable';
import GroupProfile from './components/GroupProfile';
import UserProfile from './components/UserProfile';
import useTelegram from './hooks/useTelegram';
import usePageTracking from './hooks/usePageTracking';
import Footer from './components/Footer';
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
      <PageTracker />
      <Routes>
        <Route path="/" element={<GroupsTable />} />
        <Route path="/group/:groupId" element={<GroupProfile />} />
        <Route path="/user/:userId/group/:groupId" element={<UserProfile />} />
        <Route path="*" element={<p>Page not found 404 xD</p>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function PageTracker() {
  usePageTracking();
  return null;
}

export default App;
