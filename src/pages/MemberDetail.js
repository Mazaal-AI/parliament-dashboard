import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const translations = {
  en: {
    backToMembers: 'Back to Members',
    position: 'Position',
    committee: 'Committee',
    sentimentOverview: 'Sentiment Overview',
    currentSentiment: 'Current Sentiment',
    previousSentiment: 'Previous Sentiment',
    trend: 'Trend',
    mentionsBreakdown: 'Mentions Breakdown',
    total: 'Total',
    news: 'News',
    facebook: 'Facebook',
    twitter: 'Twitter',
    recentMentions: 'Recent Mentions',
    source: 'Source',
    date: 'Date',
    sentiment: 'Sentiment',
    view: 'View',
    sentimentTrend: 'Sentiment Trend (Last 7 Days)',
    notFound: 'Member not found'
  },
  mn: {
    backToMembers: 'Гишүүд рүү буцах',
    position: 'Албан тушаал',
    committee: 'Хороо',
    sentimentOverview: 'Хандлагын тойм',
    currentSentiment: 'Одоогийн хандлага',
    previousSentiment: 'Өмнөх хандлага',
    trend: 'Чиг хандлага',
    mentionsBreakdown: 'Дурдсан задаргаа',
    total: 'Нийт',
    news: 'Мэдээ',
    facebook: 'Фэйсбүүк',
    twitter: 'Твиттер',
    recentMentions: 'Сүүлийн дурдсан',
    source: 'Эх сурвалж',
    date: 'Огноо',
    sentiment: 'Хандлага',
    view: 'Харах',
    sentimentTrend: 'Хандлагын чиг хандлага (Сүүлийн 7 хоног)',
    notFound: 'Гишүүн олдсонгүй'
  }
};

const MemberDetail = ({ language }) => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
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
              const foundMember = data.find(m => m.id === parseInt(id));
              setMember(foundMember || null);
              setIsLoading(false);
            });
        }, 500);
      } catch (error) {
        console.error('Error fetching member details:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Generate mock sentiment trend data
  const generateSentimentTrendData = () => {
    if (!member) return null;
    
    const dates = [];
    const sentimentValues = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
      
      // Generate random sentiment values around the current sentiment
      const baseSentiment = member.sentiment.current;
      const randomVariation = (Math.random() - 0.5) * 0.1; // Random variation between -0.05 and 0.05
      let sentimentValue = baseSentiment + randomVariation;
      
      // Ensure sentiment stays between 0 and 1
      sentimentValue = Math.max(0, Math.min(1, sentimentValue));
      sentimentValues.push(sentimentValue);
    }
    
    return {
      labels: dates,
      datasets: [
        {
          label: t.sentiment,
          data: sentimentValues.map(val => val * 100),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4
        }
      ]
    };
  };

  const sentimentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 30,
        max: 80,
        title: {
          display: true,
          text: 'Sentiment Score (%)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    }
  };

  const getSentimentClass = (sentiment) => {
    if (sentiment > 0.6) return 'sentiment-positive';
    if (sentiment >= 0.4) return 'sentiment-neutral';
    return 'sentiment-negative';
  };

  const getSentimentBadgeClass = (sentiment) => {
    if (sentiment === 'positive') return 'badge-positive';
    if (sentiment === 'neutral') return 'badge-neutral';
    return 'badge-negative';
  };

  if (isLoading) {
    return <Container><p>Loading member details...</p></Container>;
  }

  if (!member) {
    return (
      <Container>
        <div className="text-center my-5">
          <h2>{t.notFound}</h2>
          <Link to="/members" className="btn btn-primary mt-3">
            {t.backToMembers}
          </Link>
        </div>
      </Container>
    );
  }

  const sentimentTrendData = generateSentimentTrendData();

  return (
    <Container fluid>
      <Link to="/members" className="btn btn-outline-secondary mb-4">
        ← {t.backToMembers}
      </Link>
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <img 
                src={member.image} 
                alt={member.name}
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
                onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'}}
              />
              <h2>{member.name}</h2>
              <p className="text-muted">{member.position}</p>
              <p>
                <strong>{t.committee}:</strong> {member.committee}
              </p>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Header>{t.sentimentOverview}</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <div className="text-center">
                    <h6>{t.currentSentiment}</h6>
                    <h3 className={getSentimentClass(member.sentiment.current)}>
                      {(member.sentiment.current * 100).toFixed(1)}%
                    </h3>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <h6>{t.previousSentiment}</h6>
                    <h3 className={getSentimentClass(member.sentiment.previous)}>
                      {(member.sentiment.previous * 100).toFixed(1)}%
                    </h3>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <h6>{t.trend}</h6>
                    <h3>
                      {member.sentiment.trend === 'up' ? (
                        <span className="text-success">↑</span>
                      ) : (
                        <span className="text-danger">↓</span>
                      )}
                    </h3>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>{t.mentionsBreakdown}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>{t.total}</span>
                <Badge bg="primary" pill>{member.mentions.total}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>{t.news}</span>
                <Badge bg="info" pill>{member.mentions.news}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>{t.facebook}</span>
                <Badge bg="primary" pill>{member.mentions.facebook}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>{t.twitter}</span>
                <Badge bg="info" pill>{member.mentions.twitter}</Badge>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>{t.sentimentTrend}</Card.Header>
            <Card.Body>
              <div className="chart-container" style={{ height: '300px' }}>
                <Line data={sentimentTrendData} options={sentimentChartOptions} />
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>{t.recentMentions}</Card.Header>
            <Card.Body>
              <ListGroup>
                {member.recentMentions.map(mention => (
                  <ListGroup.Item key={mention.id}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5>{mention.title}</h5>
                        <p>{mention.snippet}</p>
                        <div>
                          <Badge bg="secondary" className="me-2">{mention.source}</Badge>
                          <small className="text-muted">{mention.date}</small>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <Badge 
                          className={`mb-2 sentiment-badge ${getSentimentBadgeClass(mention.sentiment)}`}
                        >
                          {mention.sentiment}
                        </Badge>
                        <Button size="sm" variant="outline-primary" href={mention.url}>
                          {t.view}
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MemberDetail;
