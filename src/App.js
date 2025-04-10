// Fixed App.js with proper routing for GitHub Pages

import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail';
import Alerts from './pages/Alerts';
import Search from './pages/Search';
import Reports from './pages/Reports';
import AIInsights from './pages/AIInsights';
import './styles/main.css';

const App = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <div className="app-container">
        <Navigation language={language} onLanguageChange={handleLanguageChange} />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard language={language} />} />
            <Route path="/members" element={<Members language={language} />} />
            <Route path="/members/:id" element={<MemberDetail language={language} />} />
            <Route path="/alerts" element={<Alerts language={language} />} />
            <Route path="/search" element={<Search language={language} />} />
            <Route path="/reports" element={<Reports language={language} />} />
            <Route path="/ai-insights" element={<AIInsights language={language} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
