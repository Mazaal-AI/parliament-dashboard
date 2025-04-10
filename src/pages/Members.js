import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const translations = {
  en: {
    title: 'Parliament Members',
    search: 'Search members...',
    filter: 'Filter by',
    all: 'All',
    committee: 'Committee',
    sentiment: 'Sentiment',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    name: 'Name',
    position: 'Position',
    mentions: 'Mentions',
    currentSentiment: 'Current Sentiment',
    trend: 'Trend',
    viewProfile: 'View Profile'
  },
  mn: {
    title: 'Парламентын гишүүд',
    search: 'Гишүүдийг хайх...',
    filter: 'Шүүлтүүр',
    all: 'Бүгд',
    committee: 'Хороо',
    sentiment: 'Хандлага',
    positive: 'Эерэг',
    neutral: 'Төвийг сахисан',
    negative: 'Сөрөг',
    name: 'Нэр',
    position: 'Албан тушаал',
    mentions: 'Дурдсан',
    currentSentiment: 'Одоогийн хандлага',
    trend: 'Чиг хандлага',
    viewProfile: 'Профайл харах'
  }
};

const Members = ({ language }) => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [committees, setCommittees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchData = async () => {
      try {
        // Simulate API call with setTimeout
        setTimeout(() => {
          fetch('/data/members.json')
            .then(response => response.json())
            .then(data => {
              setMembers(data);
              setFilteredMembers(data);
              
              // Extract unique committees
              const uniqueCommittees = [...new Set(data.map(member => member.committee))];
              setCommittees(uniqueCommittees);
              
              setIsLoading(false);
            });
        }, 500);
      } catch (error) {
        console.error('Error fetching members:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters whenever search term or filters change
    let result = members;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply committee filter
    if (committeeFilter !== 'all') {
      result = result.filter(member => member.committee === committeeFilter);
    }
    
    // Apply sentiment filter
    if (sentimentFilter !== 'all') {
      result = result.filter(member => {
        const sentiment = member.sentiment.current;
        if (sentimentFilter === 'positive') return sentiment > 0.6;
        if (sentimentFilter === 'neutral') return sentiment >= 0.4 && sentiment <= 0.6;
        if (sentimentFilter === 'negative') return sentiment < 0.4;
        return true;
      });
    }
    
    setFilteredMembers(result);
  }, [searchTerm, committeeFilter, sentimentFilter, members]);

  const getSentimentClass = (sentiment) => {
    if (sentiment > 0.6) return 'sentiment-positive';
    if (sentiment >= 0.4) return 'sentiment-neutral';
    return 'sentiment-negative';
  };

  const getSentimentBadgeClass = (sentiment) => {
    if (sentiment > 0.6) return 'badge-positive';
    if (sentiment >= 0.4) return 'badge-neutral';
    return 'badge-negative';
  };

  if (isLoading) {
    return <Container><p>Loading members...</p></Container>;
  }

  return (
    <Container fluid>
      <h1 className="mb-4">{t.title}</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>{t.filter} {t.committee}</Form.Label>
            <Form.Select 
              value={committeeFilter}
              onChange={(e) => setCommitteeFilter(e.target.value)}
            >
              <option value="all">{t.all}</option>
              {committees.map((committee, index) => (
                <option key={index} value={committee}>{committee}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>{t.filter} {t.sentiment}</Form.Label>
            <Form.Select 
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
            >
              <option value="all">{t.all}</option>
              <option value="positive">{t.positive}</option>
              <option value="neutral">{t.neutral}</option>
              <option value="negative">{t.negative}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>{t.name}</th>
                <th>{t.position}</th>
                <th>{t.committee}</th>
                <th>{t.mentions}</th>
                <th>{t.currentSentiment}</th>
                <th>{t.trend}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                        onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/40'}}
                      />
                      {member.name}
                    </div>
                  </td>
                  <td>{member.position}</td>
                  <td>{member.committee}</td>
                  <td>{member.mentions.total}</td>
                  <td>
                    <Badge className={`sentiment-badge ${getSentimentBadgeClass(member.sentiment.current)}`}>
                      {(member.sentiment.current * 100).toFixed(0)}%
                    </Badge>
                  </td>
                  <td>
                    {member.sentiment.trend === 'up' ? (
                      <span className="text-success">↑</span>
                    ) : (
                      <span className="text-danger">↓</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/members/${member.id}`} className="btn btn-sm btn-outline-primary">
                      {t.viewProfile}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Members;
