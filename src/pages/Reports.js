import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const translations = {
  en: {
    title: 'Reports',
    generateReport: 'Generate Report',
    reportType: 'Report Type',
    dailySummary: 'Daily Summary',
    weeklyTrend: 'Weekly Trend',
    memberComparison: 'Member Comparison',
    topicAnalysis: 'Topic Analysis',
    dateRange: 'Date Range',
    from: 'From',
    to: 'To',
    members: 'Members',
    selectMembers: 'Select Members',
    topics: 'Topics',
    selectTopics: 'Select Topics',
    platforms: 'Platforms',
    selectPlatforms: 'Select Platforms',
    news: 'News',
    facebook: 'Facebook',
    twitter: 'Twitter',
    exportFormat: 'Export Format',
    pdf: 'PDF',
    excel: 'Excel',
    csv: 'CSV',
    reportPreview: 'Report Preview',
    overallSentiment: 'Overall Sentiment',
    platformBreakdown: 'Platform Breakdown',
    topMentionedMembers: 'Top Mentioned Members',
    topTopics: 'Top Topics',
    member: 'Member',
    mentions: 'Mentions',
    sentiment: 'Sentiment',
    topic: 'Topic',
    count: 'Count',
    export: 'Export Report'
  },
  mn: {
    title: 'Тайлангууд',
    generateReport: 'Тайлан үүсгэх',
    reportType: 'Тайлангийн төрөл',
    dailySummary: 'Өдөр тутмын хураангуй',
    weeklyTrend: 'Долоо хоногийн чиг хандлага',
    memberComparison: 'Гишүүдийн харьцуулалт',
    topicAnalysis: 'Сэдвийн шинжилгээ',
    dateRange: 'Огноо',
    from: 'Эхлэх',
    to: 'Дуусах',
    members: 'Гишүүд',
    selectMembers: 'Гишүүдийг сонгох',
    topics: 'Сэдвүүд',
    selectTopics: 'Сэдвүүдийг сонгох',
    platforms: 'Платформууд',
    selectPlatforms: 'Платформуудыг сонгох',
    news: 'Мэдээ',
    facebook: 'Фэйсбүүк',
    twitter: 'Твиттер',
    exportFormat: 'Экспортын формат',
    pdf: 'PDF',
    excel: 'Excel',
    csv: 'CSV',
    reportPreview: 'Тайлангийн урьдчилсан харах',
    overallSentiment: 'Нийт хандлага',
    platformBreakdown: 'Платформын задаргаа',
    topMentionedMembers: 'Хамгийн их дурдагдсан гишүүд',
    topTopics: 'Гол сэдвүүд',
    member: 'Гишүүн',
    mentions: 'Дурдсан',
    sentiment: 'Хандлага',
    topic: 'Сэдэв',
    count: 'Тоо',
    export: 'Тайланг экспортлох'
  }
};

// Mock data for reports
const mockMembers = [
  { id: 1, name: 'Dashzegve AMARBAYASGALAN' },
  { id: 2, name: 'Khurelbaatar BULGANTUYA' },
  { id: 3, name: 'NOROV ALTANKHUYAG' },
  { id: 4, name: 'SAINBUYAN AMARSAIKHAN' },
  { id: 5, name: 'TELUKHAN AUBAKIR' },
  { id: 6, name: 'ENKHTAIVAN BAT-AMGALAN' },
  { id: 7, name: 'Jadamba BAT-ERDENE' },
  { id: 8, name: 'JIGJID BATJARGAL' }
];

const mockTopics = [
  { id: 1, name: 'Economic Policy' },
  { id: 2, name: 'Healthcare Reform' },
  { id: 3, name: 'Environmental Protection' },
  { id: 4, name: 'Foreign Relations' },
  { id: 5, name: 'Budget Debate' },
  { id: 6, name: 'Education Reform' },
  { id: 7, name: 'Digital Transformation' },
  { id: 8, name: 'Cultural Heritage' }
];

const Reports = ({ language }) => {
  const [reportType, setReportType] = useState('dailySummary');
  const [dateFrom, setDateFrom] = useState('2025-04-03');
  const [dateTo, setDateTo] = useState('2025-04-09');
  const [selectedMembers, setSelectedMembers] = useState([1, 2, 3]);
  const [selectedTopics, setSelectedTopics] = useState([1, 2, 3, 4, 5]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['news', 'facebook', 'twitter']);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showPreview, setShowPreview] = useState(true);
  const t = translations[language];

  // Handle member selection
  const handleMemberChange = (id) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(memberId => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  // Handle topic selection
  const handleTopicChange = (id) => {
    if (selectedTopics.includes(id)) {
      setSelectedTopics(selectedTopics.filter(topicId => topicId !== id));
    } else {
      setSelectedTopics([...selectedTopics, id]);
    }
  };

  // Handle platform selection
  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Generate report
  const handleGenerateReport = (e) => {
    e.preventDefault();
    setShowPreview(true);
    // In a real application, this would make an API call to generate the report
  };

  // Mock data for sentiment trend chart
  const sentimentTrendData = {
    labels: ['2025-04-03', '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09'],
    datasets: [
      {
        label: t.overallSentiment,
        data: [53, 55, 59, 57, 54, 56, 58].map(val => val),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: t.news,
        data: [56, 58, 63, 61, 57, 59, 62].map(val => val),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4
      },
      {
        label: t.facebook,
        data: [45, 47, 52, 49, 46, 48, 51].map(val => val),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4
      },
      {
        label: t.twitter,
        data: [58, 60, 62, 60, 59, 62, 61].map(val => val),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        tension: 0.4
      }
    ]
  };

  // Chart options for sentiment trend
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

  // Mock data for member comparison chart
  const memberComparisonData = {
    labels: selectedMembers.map(id => {
      const member = mockMembers.find(m => m.id === id);
      return member ? member.name.split(' ')[1] : '';
    }),
    datasets: [
      {
        label: t.mentions,
        data: [342, 287, 198, 176, 154, 143, 132, 128].filter((_, index) => selectedMembers.includes(index + 1)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: t.sentiment,
        data: [65, 72, 42, 58, 61, 53, 39, 67].filter((_, index) => selectedMembers.includes(index + 1)),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        yAxisID: 'y1'
      }
    ]
  };

  // Chart options for member comparison
  const memberComparisonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: t.mentions
        }
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: t.sentiment
        },
        max: 100
      }
    },
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  // Mock data for topic analysis
  const topicData = [
    { id: 1, topic: 'Economic Policy', count: 87, sentiment: 64 },
    { id: 2, topic: 'Healthcare Reform', count: 65, sentiment: 72 },
    { id: 3, topic: 'Environmental Protection', count: 52, sentiment: 68 },
    { id: 4, topic: 'Foreign Relations', count: 48, sentiment: 55 },
    { id: 5, topic: 'Budget Debate', count: 43, sentiment: 41 },
    { id: 6, topic: 'Education Reform', count: 41, sentiment: 72 },
    { id: 7, topic: 'Digital Transformation', count: 38, sentiment: 63 },
    { id: 8, topic: 'Cultural Heritage', count: 37, sentiment: 74 }
  ].filter(topic => selectedTopics.includes(topic.id));

  // Mock data for member mentions
  const memberData = [
    { id: 1, name: 'Dashzegve AMARBAYASGALAN', mentions: 342, sentiment: 65 },
    { id: 2, name: 'Khurelbaatar BULGANTUYA', mentions: 287, sentiment: 72 },
    { id: 3, name: 'NOROV ALTANKHUYAG', mentions: 198, sentiment: 42 },
    { id: 4, name: 'SAINBUYAN AMARSAIKHAN', mentions: 176, sentiment: 58 },
    { id: 5, name: 'TELUKHAN AUBAKIR', mentions: 154, sentiment: 61 }
  ].filter(member => selectedMembers.includes(member.id));

  return (
    <Container fluid>
      <h1 className="mb-4">{t.title}</h1>
      
      <Row>
        <Col md={4} lg={3}>
          <Card className="mb-4">
            <Card.Header>{t.generateReport}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleGenerateReport}>
                <Form.Group className="mb-3">
                  <Form.Label>{t.reportType}</Form.Label>
                  <Form.Select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="dailySummary">{t.dailySummary}</option>
                    <option value="weeklyTrend">{t.weeklyTrend}</option>
                    <option value="memberComparison">{t.memberComparison}</option>
                    <option value="topicAnalysis">{t.topicAnalysis}</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>{t.dateRange}</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                
                {(reportType === 'memberComparison' || reportType === 'dailySummary') && (
                  <Form.Group className="mb-3">
                    <Form.Label>{t.members}</Form.Label>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {mockMembers.map(member => (
                        <Form.Check
                          key={member.id}
                          type="checkbox"
                          id={`member-${member.id}`}
                          label={member.name}
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => handleMemberChange(member.id)}
                        />
                      ))}
                    </div>
                  </Form.Group>
                )}
                
                {(reportType === 'topicAnalysis' || reportType === 'dailySummary') && (
                  <Form.Group className="mb-3">
                    <Form.Label>{t.topics}</Form.Label>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {mockTopics.map(topic => (
                        <Form.Check
                          key={topic.id}
                          type="checkbox"
                          id={`topic-${topic.id}`}
                          label={topic.name}
                          checked={selectedTopics.includes(topic.id)}
                          onChange={() => handleTopicChange(topic.id)}
                        />
                      ))}
                    </div>
                  </Form.Group>
                )}
                
                <Form.Group className="mb-3">
                  <Form.Label>{t.platforms}</Form.Label>
                  <div>
                    <Form.Check
                      type="checkbox"
                      id="platform-news"
                      label={t.news}
                      checked={selectedPlatforms.includes('news')}
                      onChange={() => handlePlatformChange('news')}
                    />
                    <Form.Check
                      type="checkbox"
                      id="platform-facebook"
                      label={t.facebook}
                      checked={selectedPlatforms.includes('facebook')}
                      onChange={() => handlePlatformChange('facebook')}
                    />
                    <Form.Check
                      type="checkbox"
                      id="platform-twitter"
                      label={t.twitter}
                      checked={selectedPlatforms.includes('twitter')}
                      onChange={() => handlePlatformChange('twitter')}
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>{t.exportFormat}</Form.Label>
                  <Form.Select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                  >
                    <option value="pdf">{t.pdf}</option>
                    <option value="excel">{t.excel}</option>
                    <option value="csv">{t.csv}</option>
                  </Form.Select>
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100">
                  {t.generateReport}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8} lg={9}>
          {showPreview && (
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                {t.reportPreview}
                <Button variant="success" size="sm">
                  {t.export}
                </Button>
              </Card.Header>
              <Card.Body>
                {(reportType === 'dailySummary' || reportType === 'weeklyTrend') && (
                  <>
                    <h4>{t.overallSentiment}</h4>
                    <div className="chart-container" style={{ height: '300px', marginBottom: '30px' }}>
                      <Line data={sentimentTrendData} options={sentimentChartOptions} />
                    </div>
                    
                    <Row className="mt-4">
                      <Col md={6}>
                        <h4>{t.topMentionedMembers}</h4>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>{t.member}</th>
                              <th>{t.mentions}</th>
                              <th>{t.sentiment}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {memberData.map(member => (
                              <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.mentions}</td>
                                <td>{member.sentiment}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                      
                      <Col md={6}>
                        <h4>{t.topTopics}</h4>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>{t.topic}</th>
                              <th>{t.count}</th>
                              <th>{t.sentiment}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topicData.map(topic => (
                              <tr key={topic.id}>
                                <td>{topic.topic}</td>
                                <td>{topic.count}</td>
                                <td>{topic.sentiment}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </>
                )}
                
                {reportType === 'memberComparison' && (
                  <>
                    <h4>{t.memberComparison}</h4>
                    <div className="chart-container" style={{ height: '400px' }}>
                      <Bar data={memberComparisonData} options={memberComparisonOptions} />
                    </div>
                  </>
                )}
                
                {reportType === 'topicAnalysis' && (
                  <>
                    <h4>{t.topicAnalysis}</h4>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>{t.topic}</th>
                          <th>{t.count}</th>
                          <th>{t.sentiment}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topicData.map(topic => (
                          <tr key={topic.id}>
                            <td>{topic.topic}</td>
                            <td>{topic.count}</td>
                            <td>{topic.sentiment}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
