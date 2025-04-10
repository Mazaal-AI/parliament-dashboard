import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const translations = {
  en: {
    dashboard: 'Dashboard',
    members: 'Members',
    alerts: 'Alerts',
    search: 'Search',
    reports: 'Reports',
    language: 'Монгол',
    title: 'Parliament of Mongolia - Social Media Monitoring'
  },
  mn: {
    dashboard: 'Хяналтын самбар',
    members: 'Гишүүд',
    alerts: 'Мэдэгдлүүд',
    search: 'Хайлт',
    reports: 'Тайлангууд',
    language: 'English',
    title: 'Монгол Улсын Парламент - Сошиал медиа хяналт'
  }
};

const Navigation = ({ language, toggleLanguage }) => {
  const location = useLocation();
  const t = translations[language];

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src="https://www.parliament.mn/images/parliament-logo.png" 
            alt="Parliament of Mongolia Logo" 
            className="d-inline-block align-top"
          />
          {t.title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              {t.dashboard}
            </Nav.Link>
            <Nav.Link as={Link} to="/members" active={location.pathname.includes('/members')}>
              {t.members}
            </Nav.Link>
            <Nav.Link as={Link} to="/alerts" active={location.pathname === '/alerts'}>
              {t.alerts}
            </Nav.Link>
            <Nav.Link as={Link} to="/search" active={location.pathname === '/search'}>
              {t.search}
            </Nav.Link>
            <Nav.Link as={Link} to="/reports" active={location.pathname === '/reports'}>
              {t.reports}
            </Nav.Link>
          </Nav>
          <Button 
            variant="outline-light" 
            size="sm" 
            onClick={toggleLanguage}
            className="language-toggle"
          >
            {t.language}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
