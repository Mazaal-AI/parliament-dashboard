import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail';
import Alerts from './pages/Alerts';
import Search from './pages/Search';
import Reports from './pages/Reports';

const App = () => {
  const [language, setLanguage] = useState('en'); // 'en' for English, 'mn' for Mongolian

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mn' : 'en');
  };

  return (
    <Router>
      <Navigation language={language} toggleLanguage={toggleLanguage} />
      <Container fluid className="mt-4 mb-5 pb-5">
        <Routes>
          <Route path="/" element={<Dashboard language={language} />} />
          <Route path="/members" element={<Members language={language} />} />
          <Route path="/members/:id" element={<MemberDetail language={language} />} />
          <Route path="/alerts" element={<Alerts language={language} />} />
          <Route path="/search" element={<Search language={language} />} />
          <Route path="/reports" element={<Reports language={language} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
