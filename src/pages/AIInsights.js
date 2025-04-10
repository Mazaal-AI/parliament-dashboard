import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';

const translations = {
  en: {
    title: 'AI Insights',
    memberInsights: 'Member Insights',
    topicAnalysis: 'Topic Analysis',
    networkAnalysis: 'Network Analysis',
    sentimentPrediction: 'Sentiment Prediction',
    aiChatbot: 'AI Assistant',
    selectMember: 'Select Member',
    insights: 'Insights',
    sentimentScore: 'Sentiment Score',
    sentimentTrend: 'Sentiment Trend',
    topTopics: 'Top Topics',
    platformBreakdown: 'Platform Breakdown',
    news: 'News',
    facebook: 'Facebook',
    twitter: 'Twitter',
    topic: 'Topic',
    topWords: 'Top Words',
    weight: 'Weight',
    predictedSentiment: 'Predicted Sentiment',
    next7Days: 'Next 7 Days',
    askQuestion: 'Ask a question about the Parliament...',
    send: 'Send',
    aiThinking: 'AI is thinking...',
    noInsightsAvailable: 'No AI insights available. Please run the advanced analytics module first.'
  },
  mn: {
    title: 'AI Дүн шинжилгээ',
    memberInsights: 'Гишүүдийн дүн шинжилгээ',
    topicAnalysis: 'Сэдвийн дүн шинжилгээ',
    networkAnalysis: 'Сүлжээний дүн шинжилгээ',
    sentimentPrediction: 'Хандлагын урьдчилсан таамаг',
    aiChatbot: 'AI Туслах',
    selectMember: 'Гишүүн сонгох',
    insights: 'Дүгнэлт',
    sentimentScore: 'Хандлагын оноо',
    sentimentTrend: 'Хандлагын чиг хандлага',
    topTopics: 'Гол сэдвүүд',
    platformBreakdown: 'Платформын задаргаа',
    news: 'Мэдээ',
    facebook: 'Фэйсбүүк',
    twitter: 'Твиттер',
    topic: 'Сэдэв',
    topWords: 'Гол үгс',
    weight: 'Жин',
    predictedSentiment: 'Таамагласан хандлага',
    next7Days: 'Дараагийн 7 хоног',
    askQuestion: 'Парламентын талаар асуулт асуух...',
    send: 'Илгээх',
    aiThinking: 'AI боловсруулж байна...',
    noInsightsAvailable: 'AI дүн шинжилгээ боломжгүй байна. Эхлээд дэвшилтэт аналитик модулийг ажиллуулна уу.'
  }
};

const AIInsights = ({ language }) => {
  const [activeTab, setActiveTab] = useState('memberInsights');
  const [memberInsights, setMemberInsights] = useState(null);
  const [selectedMember, setSelectedMember] = useState('');
  const [topics, setTopics] = useState(null);
  const [networkData, setNetworkData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [chatbotData, setChatbotData] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const t = translations[language];

  useEffect(() => {
    // Load AI data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Load member profiles to get the list of members
        const membersResponse = await fetch('./data/members.json');
        if (membersResponse.ok) {
          const membersData = await membersResponse.json();
          setMembers(membersData);
          
          // Set the first member as selected by default
          if (membersData.length > 0 && !selectedMember) {
            setSelectedMember(membersData[0].name);
          }
        }
        
        // Load member insights
        try {
          const insightsResponse = await fetch('./data/member_insights.json');
          if (insightsResponse.ok) {
            const insightsData = await insightsResponse.json();
            setMemberInsights(insightsData);
          }
        } catch (error) {
          console.log('Member insights not available');
        }
        
        // Load topic analysis
        try {
          const topicsResponse = await fetch('./data/ai_topics.json');
          if (topicsResponse.ok) {
            const topicsData = await topicsResponse.json();
            setTopics(topicsData);
          }
        } catch (error) {
          console.log('Topic analysis not available');
        }
        
        // Load network data
        try {
          const networkResponse = await fetch('./data/entity_network.json');
          if (networkResponse.ok) {
            const networkData = await networkResponse.json();
            setNetworkData(networkData);
          }
        } catch (error) {
          console.log('Network analysis not available');
        }
        
        // Load sentiment predictions
        try {
          const predictionsResponse = await fetch('./data/sentiment_predictions.json');
          if (predictionsResponse.ok) {
            const predictionsData = await predictionsResponse.json();
            setPredictions(predictionsData);
          }
        } catch (error) {
          console.log('Sentiment predictions not available');
        }
        
        // Load chatbot data
        try {
          const chatbotResponse = await fetch('./data/chatbot_data.json');
          if (chatbotResponse.ok) {
            const chatbotData = await chatbotResponse.json();
            setChatbotData(chatbotData);
          }
        } catch (error) {
          console.log('Chatbot data not available');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading AI data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add user question to chat history
    setChatHistory([...chatHistory, { role: 'user', content: question }]);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Generate a response based on the question
      const response = generateResponse(question);
      
      // Add AI response to chat history
      setChatHistory([...chatHistory, { role: 'user', content: question }, { role: 'ai', content: response }]);
      
      // Clear the question input
      setQuestion('');
    }, 1000);
  };

  const generateResponse = (question) => {
    // This is a simplified response generator for the demo
    // In a real implementation, this would use the chatbot data and more sophisticated NLP
    
    const lowerQuestion = question.toLowerCase();
    
    // Check for sentiment questions
    if (lowerQuestion.includes('sentiment') && lowerQuestion.includes('overall')) {
      return "Based on our analysis, the overall sentiment about the Parliament of Mongolia is moderately positive (58%). This is calculated from over 1,500 mentions across news, Facebook, and Twitter.";
    }
    
    // Check for member questions
    if (lowerQuestion.includes('most mentioned') && lowerQuestion.includes('member')) {
      return "The most mentioned parliament member is Dashzegve AMARBAYASGALAN with 342 mentions across all platforms.";
    }
    
    // Check for topic questions
    if (lowerQuestion.includes('top topics')) {
      return "The top topics discussed about the Parliament are: Economic Policy, Healthcare Reform, and Environmental Protection.";
    }
    
    // Check for platform questions
    if (lowerQuestion.includes('platform') && lowerQuestion.includes('positive')) {
      return "Based on our analysis, News media has the most positive sentiment about the Parliament with a score of 62%.";
    }
    
    // Check for prediction questions
    if (lowerQuestion.includes('prediction') || lowerQuestion.includes('future')) {
      return "Our AI model predicts that the overall sentiment will slightly improve in the coming days, with an expected increase of 2-3% in positive mentions.";
    }
    
    // Default response
    return "I don't have enough specific information to answer that question accurately. You can ask about overall sentiment, member mentions, top topics, platform comparisons, or future predictions.";
  };

  const renderMemberInsights = () => {
    if (!memberInsights || !selectedMember || !memberInsights[selectedMember]) {
      return (
        <Card>
          <Card.Body className="text-center py-5">
            <h4>{t.noInsightsAvailable}</h4>
          </Card.Body>
        </Card>
      );
    }
    
    const insights = memberInsights[selectedMember];
    
    return (
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>{t.insights}</Card.Header>
            <ListGroup variant="flush">
              {insights.insights.map((insight, index) => (
                <ListGroup.Item key={index}>{insight}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          
          <Card className="mb-4">
            <Card.Header>{t.platformBreakdown}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {Object.entries(insights.sentiment_by_source).map(([source, sentiment]) => (
                  <ListGroup.Item key={source} className="d-flex justify-content-between align-items-center">
                    <span>{source.includes('news') ? t.news : 
                           source.includes('facebook') ? t.facebook : 
                           source.includes('twitter') ? t.twitter : source}</span>
                    <Badge 
                      className={`sentiment-badge ${
                        sentiment > 0.6 ? 'badge-positive' : 
                        sentiment > 0.4 ? 'badge-neutral' : 
                        'badge-negative'
                      }`}
                    >
                      {(sentiment * 100).toFixed(0)}%
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>{t.sentimentScore}</Card.Header>
            <Card.Body className="text-center">
              <h1 className={`display-4 ${
                insights.sentiment_mean > 0.6 ? 'sentiment-positive' : 
                insights.sentiment_mean > 0.4 ? 'sentiment-neutral' : 
                'sentiment-negative'
              }`}>
                {(insights.sentiment_mean * 100).toFixed(1)}%
              </h1>
              <p>
                <span className={insights.sentiment_mean > 0.5 ? 'text-success' : 'text-danger'}>
                  {insights.sentiment_mean > 0.5 ? '↑' : '↓'}
                </span>
                {' '}Volatility: {(insights.sentiment_std * 100).toFixed(1)}%
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>{t.sentimentTrend}</Card.Header>
            <Card.Body>
              <div className="chart-container">
                {/* In a real implementation, this would be a Line chart */}
                <div className="sentiment-trend-placeholder">
                  {insights.sentiment_trend.map((point, index) => (
                    <div key={index} className="trend-point" style={{ 
                      left: `${index * (100 / (insights.sentiment_trend.length - 1))}%`,
                      bottom: `${point[1] * 100}%`
                    }}></div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  const renderTopicAnalysis = () => {
    if (!topics) {
      return (
        <Card>
          <Card.Body className="text-center py-5">
            <h4>{t.noInsightsAvailable}</h4>
          </Card.Body>
        </Card>
      );
    }
    
    return (
      <Card>
        <Card.Header>{t.topicAnalysis}</Card.Header>
        <Card.Body>
          <Row>
            {topics.map(topic => (
              <Col md={6} key={topic.id} className="mb-4">
                <Card>
                  <Card.Header>
                    {t.topic} {topic.id + 1}
                    <Badge bg="info" className="ms-2">
                      {t.weight}: {topic.weight.toFixed(2)}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <h5>{t.topWords}</h5>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {topic.top_words.map((word, index) => (
                        <Badge 
                          key={index} 
                          bg="primary" 
                          style={{ fontSize: `${1 + (10 - index) * 0.1}rem` }}
                        >
                          {word}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* In a real implementation, this would show a word cloud image */}
                    <div className="wordcloud-placeholder">
                      <p className="text-center text-muted">Word cloud visualization would appear here</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    );
  };

  const renderNetworkAnalysis = () => {
    if (!networkData) {
      return (
        <Card>
          <Card.Body className="text-center py-5">
            <h4>{t.noInsightsAvailable}</h4>
          </Card.Body>
        </Card>
      );
    }
    
    return (
      <Card>
        <Card.Header>{t.networkAnalysis}</Card.Header>
        <Card.Body>
          <div className="network-visualization-placeholder" style={{ height: '500px' }}>
            <p className="text-center text-muted">
              Network visualization would appear here, showing relationships between {networkData.nodes.length} entities 
              and {networkData.links.length} connections.
            </p>
            
            <div className="network-stats">
              <Row>
                <Col md={6}>
                  <h5>Members</h5>
                  <ListGroup>
                    {networkData.nodes
                      .filter(node => node.type === 'member')
                      .sort((a, b) => b.mentions - a.mentions)
                      .slice(0, 5)
                      .map(node => (
                        <ListGroup.Item key={node.id} className="d-flex justify-content-between align-items-center">
                          {node.id}
                          <Badge bg="primary">{node.mentions} mentions</Badge>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h5>Topics</h5>
                  <ListGroup>
                    {networkData.nodes
                      .filter(node => node.type === 'topic')
                      .sort((a, b) => b.mentions - a.mentions)
                      .slice(0, 5)
                      .map(node => (
                        <ListGroup.Item key={node.id} className="d-flex justify-content-between align-items-center">
                          {node.id}
                          <Badge bg="info">{node.mentions} mentions</Badge>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Col>
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderSentimentPrediction = () => {
    if (!predictions) {
      return (
        <Card>
          <Card.Body className="text-center py-5">
            <h4>{t.noInsightsAvailable}</h4>
          </Card.Body>
        </Card>
      );
    }
    
    return (
      <Card>
        <Card.Header>{t.predictedSentiment} - {t.next7Days}</Card.Header>
        <Card.Body>
          <div className="prediction-visualization-placeholder" style={{ height: '400px' }}>
            <p className="text-center text-muted">
              Sentiment prediction chart would appear here, showing forecasted sentiment for the next 7 days.
            </p>
            
            <div className="prediction-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Overall</th>
                    <th>{t.news}</th>
                    <th>{t.facebook}</th>
                    <th>{t.twitter}</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((prediction, index) => (
                    <tr key={index}>
                      <td>{prediction.date}</td>
                      <td className={
                        prediction.overall > 0.6 ? 'text-success' : 
                        prediction.overall > 0.4 ? 'text-warning' : 
                        'text-danger'
                      }>
                        {(prediction.overall * 100).toFixed(1)}%
                      </td>
                      <td>{(prediction.news * 100).toFixed(1)}%</td>
                      <td>{(prediction.facebook * 100).toFixed(1)}%</td>
                      <td>{(prediction.twitter * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderChatbot = () => {
    return (
      <Card>
        <Card.Header>{t.aiChatbot}</Card.Header>
        <Card.Body>
          <div className="chatbot-container">
            <div className="chat-history">
              {chatHistory.length === 0 ? (
                <div className="text-center text-muted my-5">
                  <p>Ask a question about the Parliament of Mongolia's social media presence</p>
                </div>
              ) : (
                chatHistory.map((message, index) => (
                  <div key={index} className={`chat-message ${message.role}`}>
                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="chat-input">
              <Form onSubmit={(e) => { e.preventDefault(); handleSendQuestion(); }}>
                <InputGroup>
                  <Form.Control
                    placeholder={t.askQuestion}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    {t.send}
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid>
      <h1 className="mb-4">{t.title}</h1>
      
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-wrap gap-2">
            <Button 
              variant={activeTab === 'memberInsights' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('memberInsights')}
            >
              {t.memberInsights}
            </Button>
            <Button 
              variant={activeTab === 'topicAnalysis' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('topicAnalysis')}
            >
              {t.topicAnalysis}
            </Button>
            <Button 
              variant={activeTab === 'networkAnalysis' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('networkAnalysis')}
            >
              {t.networkAnalysis}
            </Button>
            <Button 
              variant={activeTab === 'sentimentPrediction' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('sentimentPrediction')}
            >
              {t.sentimentPrediction}
            </Button>
            <Button 
              variant={activeTab === 'aiChatbot' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('aiChatbot')}
            >
              {t.aiChatbot}
            </Button>
          </div>
        </Col>
      </Row>
      
      {activeTab === 'memberInsights' && (
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>{t.selectMember}</Form.Label>
              <Form.Select 
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
              >
                {members.map(member => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      )}
      
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading AI insights...</p>
        </div>
      ) : (
        <>
          {activeTab === 'memberInsights' && renderMemberInsights()}
          {activeTab === 'topicAnalysis' && renderTopicAnalysis()}
          {activeTab === 'networkAnalysis' && renderNetworkAnalysis()}
          {activeTab === 'sentimentPrediction' && renderSentimentPrediction()}
          {activeTab === 'aiChatbot' && renderChatbot()}
        </>
      )}
    </Container>
  );
};

export default AIInsights;
