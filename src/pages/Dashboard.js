import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Button } from 'react-bootstrap';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const translations = {
  en: {
    overview: 'Overview',
    sentiment: 'Sentiment Analysis',
    platforms: 'Platform Distribution',
    topMembers: 'Top Members',
    topTopics: 'Top Topics',
    recentAlerts: 'Recent Alerts',
    sentimentScore: 'Sentiment Score',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    news: 'News',
    facebook: 'Facebook',
    twitter: 'Twitter',
    member: 'Member',
    mentions: 'Mentions',
    topic: 'Topic',
    viewAll: 'View All',
    date: 'Date',
    type: 'Type',
    source: 'Source',
    content: 'Content',
    noData: 'No data available'
  },
  mn: {
    overview: 'Ерөнхий байдал',
    sentiment: 'Хандлагын дүн шинжилгээ',
    platforms: 'Платформын тархалт',
    topMembers: 'Шилдэг гишүүд',
    topTopics: 'Гол сэдвүүд',
    recentAlerts: 'Сүүлийн мэдэгдлүүд',
    sentimentScore: 'Хандлагын оноо',
    positive: 'Эерэг',
    neutral: 'Төвийг сахисан',
    negative: 'Сөрөг',
    news: 'Мэдээ',
    facebook: 'Фэйсбүүк',
    twitter: 'Твиттер',
    member: 'Гишүүн',
    mentions: 'Дурдсан',
    topic: 'Сэдэв',
    viewAll: 'Бүгдийг харах',
    date: 'Огноо',
    type: 'Төрөл',
    source: 'Эх сурвалж',
    content: 'Агуулга',
    noData: 'Өгөгдөл байхгүй байна'
  }
};

const Dashboard = ({ language }) => {
  const [sentimentData, setSentimentData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [topicData, setTopicData] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch sentiment trends
        try {
          const sentimentResponse = await fetch('./data/sentiment_trends.json');
          if (sentimentResponse.ok) {
            const sentimentData = await sentimentResponse.json();
            setSentimentData(sentimentData);
          } else {
            console.error('Failed to load sentiment data');
            setSentimentData([]);
          }
        } catch (error) {
          console.error('Error loading sentiment data:', error);
          setSentimentData([]);
        }
        
        // Fetch member mentions
        try {
          const memberResponse = await fetch('./data/member_mentions.json');
          if (memberResponse.ok) {
            const memberData = await memberResponse.json();
            setMemberData(memberData);
          } else {
            console.error('Failed to load member data');
            setMemberData({});
          }
        } catch (error) {
          console.error('Error loading member data:', error);
          setMemberData({});
        }
        
        // Fetch topic mentions
        try {
          const topicResponse = await fetch('./data/topic_mentions.json');
          if (topicResponse.ok) {
            const topicData = await topicResponse.json();
            setTopicData(topicData);
          } else {
            console.error('Failed to load topic data');
            setTopicData({});
          }
        } catch (error) {
          console.error('Error loading topic data:', error);
          setTopicData({});
        }
        
        // Fetch alerts
        try {
          const alertResponse = await fetch('./data/alerts.json');
          if (alertResponse.ok) {
            const alertData = await alertResponse.json();
            setAlertData(alertData);
          } else {
            console.error('Failed to load alert data');
            setAlertData([]);
          }
        } catch (error) {
          console.error('Error loading alert data:', error);
          setAlertData([]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Safely prepare data for charts and components
  const prepareChartData = () => {
    if (!sentimentData || sentimentData.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }
    
    // Sort by date
    const sortedData = [...sentimentData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      labels: sortedData.map(item => item.date),
      datasets: [
        {
          label: t.overall,
          data: sortedData.map(item => (item.overall * 100).toFixed(1)),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        },
        {
          label: t.news,
          data: sortedData.map(item => (item.news * 100).toFixed(1)),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1
        },
        {
          label: t.facebook,
          data: sortedData.map(item => (item.facebook * 100).toFixed(1)),
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          tension: 0.1
        },
        {
          label: t.twitter,
          data: sortedData.map(item => (item.twitter * 100).toFixed(1)),
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          tension: 0.1
        }
      ]
    };
  };

  const preparePlatformData = () => {
    if (!sentimentData || sentimentData.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }
    
    // Use the most recent data point
    const latestData = sentimentData[0];
    
    return {
      labels: [t.news, t.facebook, t.twitter],
      datasets: [
        {
          data: [
            latestData.news * 100,
            latestData.facebook * 100,
            latestData.twitter * 100
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Safely get top members and topics
  const getTopMembers = () => {
    if (!memberData) return [];
    
    try {
      return Object.entries(memberData)
        .sort((a, b) => b[1].total - a[1].total)
        .slice(0, 5)
        .map(([name, data]) => ({
          name,
          mentions: data.total,
          sentiment: data.sentiment
        }));
    } catch (error) {
      console.error('Error processing member data:', error);
      return [];
    }
  };

  const getTopTopics = () => {
    if (!topicData) return [];
    
    try {
      return Object.entries(topicData || {})
        .sort((a, b) => (b[1]?.total || 0) - (a[1]?.total || 0))
        .slice(0, 5)
        .map(([name, data]) => ({
          name,
          mentions: data.total,
          sentiment: data.sentiment
        }));
    } catch (error) {
      console.error('Error processing topic data:', error);
      return [];
    }
  };

  const getRecentAlerts = () => {
    if (!alertData) return [];
    
    try {
      return alertData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    } catch (error) {
      console.error('Error processing alert data:', error);
      return [];
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 30,
        max: 70,
        title: {
          display: true,
          text: `${t.sentimentScore} (%)`
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
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    }
  };

  const topMembers = getTopMembers();
  const topTopics = getTopTopics();
  const recentAlerts = getRecentAlerts();

  return (
    <Container fluid>
      <h1 className="mb-4">{t.overview}</h1>
      
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col lg={8}>
              <Card className="h-100">
                <Card.Header>{t.sentiment}</Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    {sentimentData && sentimentData.length > 0 ? (
                      <Line data={prepareChartData()} options={chartOptions} />
                    ) : (
                      <div className="text-center py-5">
                        <p>{t.noData}</p>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="h-100">
                <Card.Header>{t.platforms}</Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    {sentimentData && sentimentData.length > 0 ? (
                      <Pie data={preparePlatformData()} options={pieOptions} />
                    ) : (
                      <div className="text-center py-5">
                        <p>{t.noData}</p>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col md={4}>
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  {t.topMembers}
                  <Button variant="outline-primary" size="sm" href="#/members">
                    {t.viewAll}
                  </Button>
                </Card.Header>
                <ListGroup variant="flush">
                  {topMembers.length > 0 ? (
                    topMembers.map((member, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fw-bold">{member.name}</span>
                          <Badge 
                            bg={member.sentiment > 0.6 ? 'success' : member.sentiment > 0.4 ? 'warning' : 'danger'}
                            className="ms-2"
                          >
                            {(member.sentiment * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <Badge bg="primary" pill>
                          {member.mentions}
                        </Badge>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item className="text-center py-3">
                      {t.noData}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  {t.topTopics}
                  <Button variant="outline-primary" size="sm" href="#/reports">
                    {t.viewAll}
                  </Button>
                </Card.Header>
                <ListGroup variant="flush">
                  {topTopics.length > 0 ? (
                    topTopics.map((topic, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fw-bold">{topic.name}</span>
                          <Badge 
                            bg={topic.sentiment > 0.6 ? 'success' : topic.sentiment > 0.4 ? 'warning' : 'danger'}
                            className="ms-2"
                          >
                            {(topic.sentiment * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <Badge bg="info" pill>
                          {topic.mentions}
                        </Badge>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item className="text-center py-3">
                      {t.noData}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  {t.recentAlerts}
                  <Button variant="outline-primary" size="sm" href="#/alerts">
                    {t.viewAll}
                  </Button>
                </Card.Header>
                <ListGroup variant="flush">
                  {recentAlerts.length > 0 ? (
                    recentAlerts.map((alert, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">{alert.date}</small>
                          <Badge 
                            bg={alert.type === 'positive' ? 'success' : 'danger'}
                          >
                            {alert.type}
                          </Badge>
                        </div>
                        <div className="mt-1">
                          <strong>{alert.member}</strong> - {alert.content}
                        </div>
                        <div className="mt-1">
                          <Badge bg="secondary">{alert.source}</Badge>
                        </div>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item className="text-center py-3">
                      {t.noData}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
