import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const translations = {
  en: {
    title: 'Alerts',
    all: 'All Alerts',
    unread: 'Unread Alerts',
    filterByPriority: 'Filter by Priority',
    allPriorities: 'All Priorities',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    filterBySentiment: 'Filter by Sentiment',
    allSentiments: 'All Sentiments',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    markAllAsRead: 'Mark All as Read',
    date: 'Date',
    time: 'Time',
    source: 'Source',
    members: 'Members',
    markAsRead: 'Mark as Read',
    noAlerts: 'No alerts match your filters'
  },
  mn: {
    title: 'Мэдэгдлүүд',
    all: 'Бүх мэдэгдэл',
    unread: 'Уншаагүй мэдэгдэл',
    filterByPriority: 'Чухлын зэргээр шүүх',
    allPriorities: 'Бүх чухлын зэрэг',
    high: 'Өндөр',
    medium: 'Дунд',
    low: 'Бага',
    filterBySentiment: 'Хандлагаар шүүх',
    allSentiments: 'Бүх хандлага',
    positive: 'Эерэг',
    neutral: 'Төвийг сахисан',
    negative: 'Сөрөг',
    markAllAsRead: 'Бүгдийг уншсан гэж тэмдэглэх',
    date: 'Огноо',
    time: 'Цаг',
    source: 'Эх сурвалж',
    members: 'Гишүүд',
    markAsRead: 'Уншсан гэж тэмдэглэх',
    noAlerts: 'Таны шүүлтүүрт тохирох мэдэгдэл байхгүй байна'
  }
};

const Alerts = ({ language }) => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchData = async () => {
      try {
        // Simulate API call with setTimeout
        setTimeout(() => {
          fetch('./data/alerts.json')
            .then(response => response.json())
            .then(data => {
              setAlerts(data);
              setFilteredAlerts(data);
              setIsLoading(false);
            });
        }, 500);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters whenever filter settings change
    let result = alerts;
    
    // Apply unread filter
    if (showUnreadOnly) {
      result = result.filter(alert => !alert.read);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(alert => alert.priority === priorityFilter);
    }
    
    // Apply sentiment filter
    if (sentimentFilter !== 'all') {
      result = result.filter(alert => alert.sentiment === sentimentFilter);
    }
    
    setFilteredAlerts(result);
  }, [showUnreadOnly, priorityFilter, sentimentFilter, alerts]);

  const markAsRead = (id) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    );
    setAlerts(updatedAlerts);
  };

  const markAllAsRead = () => {
    const updatedAlerts = alerts.map(alert => ({ ...alert, read: true }));
    setAlerts(updatedAlerts);
  };

  const getSentimentBadgeClass = (sentiment) => {
    if (sentiment === 'positive') return 'badge-positive';
    if (sentiment === 'neutral') return 'badge-neutral';
    return 'badge-negative';
  };

  const getPriorityBadgeVariant = (priority) => {
    if (priority === 'high') return 'danger';
    if (priority === 'medium') return 'warning';
    return 'success';
  };

  if (isLoading) {
    return <Container><p>Loading alerts...</p></Container>;
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{t.title}</h1>
        <Button variant="outline-primary" onClick={markAllAsRead}>
          {t.markAllAsRead}
        </Button>
      </div>
      
      <Row className="mb-4">
        <Col md={3}>
          <Form.Check
            type="switch"
            id="unread-switch"
            label={t.unread}
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="mb-3"
          />
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>{t.filterByPriority}</Form.Label>
            <Form.Select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">{t.allPriorities}</option>
              <option value="high">{t.high}</option>
              <option value="medium">{t.medium}</option>
              <option value="low">{t.low}</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>{t.filterBySentiment}</Form.Label>
            <Form.Select 
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
            >
              <option value="all">{t.allSentiments}</option>
              <option value="positive">{t.positive}</option>
              <option value="neutral">{t.neutral}</option>
              <option value="negative">{t.negative}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      {filteredAlerts.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <h4>{t.noAlerts}</h4>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {filteredAlerts.map(alert => (
            <ListGroup.Item 
              key={alert.id} 
              className={`alert-item ${alert.priority} ${alert.read ? 'bg-light' : ''}`}
            >
              <Row>
                <Col md={9}>
                  <h4>{alert.title}</h4>
                  <p>{alert.description}</p>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    <div>
                      <strong>{t.date}:</strong> {alert.date}
                    </div>
                    <div>
                      <strong>{t.time}:</strong> {alert.time}
                    </div>
                    <div>
                      <strong>{t.source}:</strong> {alert.source}
                    </div>
                  </div>
                  <div>
                    <strong>{t.members}:</strong>{' '}
                    {alert.members.map((member, index) => (
                      <span key={index}>
                        {index > 0 && ', '}
                        <Link to={`/members/${alert.id}`}>{member}</Link>
                      </span>
                    ))}
                  </div>
                </Col>
                <Col md={3} className="d-flex flex-column align-items-end justify-content-between">
                  <div className="d-flex gap-2 mb-3">
                    <Badge 
                      className={`sentiment-badge ${getSentimentBadgeClass(alert.sentiment)}`}
                    >
                      {alert.sentiment}
                    </Badge>
                    <Badge bg={getPriorityBadgeVariant(alert.priority)}>
                      {alert.priority}
                    </Badge>
                  </div>
                  {!alert.read && (
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => markAsRead(alert.id)}
                    >
                      {t.markAsRead}
                    </Button>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Alerts;
