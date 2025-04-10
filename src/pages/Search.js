import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, ListGroup, Badge } from 'react-bootstrap';

const translations = {
  en: {
    title: 'Search Content',
    searchPlaceholder: 'Search for keywords, members, or topics...',
    search: 'Search',
    filters: 'Filters',
    dateRange: 'Date Range',
    from: 'From',
    to: 'To',
    platform: 'Platform',
    all: 'All',
    news: 'News',
    facebook: 'Facebook',
    twitter: 'Twitter',
    sentiment: 'Sentiment',
    allSentiments: 'All Sentiments',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    member: 'Parliament Member',
    allMembers: 'All Members',
    searchResults: 'Search Results',
    noResults: 'No results found. Try different search terms or filters.',
    resultsCount: 'Found {count} results',
    source: 'Source',
    date: 'Date'
  },
  mn: {
    title: 'Агуулга хайх',
    searchPlaceholder: 'Түлхүүр үг, гишүүд, эсвэл сэдвүүдийг хайх...',
    search: 'Хайх',
    filters: 'Шүүлтүүрүүд',
    dateRange: 'Огноо',
    from: 'Эхлэх',
    to: 'Дуусах',
    platform: 'Платформ',
    all: 'Бүгд',
    news: 'Мэдээ',
    facebook: 'Фэйсбүүк',
    twitter: 'Твиттер',
    sentiment: 'Хандлага',
    allSentiments: 'Бүх хандлага',
    positive: 'Эерэг',
    neutral: 'Төвийг сахисан',
    negative: 'Сөрөг',
    member: 'Парламентын гишүүн',
    allMembers: 'Бүх гишүүд',
    searchResults: 'Хайлтын үр дүн',
    noResults: 'Үр дүн олдсонгүй. Өөр хайлтын үг эсвэл шүүлтүүр ашиглана уу.',
    resultsCount: '{count} үр дүн олдлоо',
    source: 'Эх сурвалж',
    date: 'Огноо'
  }
};

// Mock search results
const mockResults = [
  {
    id: 1,
    title: 'Parliament Chairman addresses economic policy',
    content: 'Chairman Amarbayasgalan emphasized the importance of sustainable economic growth during his address to the Economic Forum.',
    date: '2025-04-09',
    source: 'news',
    url: '#',
    sentiment: 'positive',
    member: 'Dashzegve AMARBAYASGALAN'
  },
  {
    id: 2,
    title: 'Budget committee hearing controversy',
    content: 'Altankhuyag\'s comments during the budget hearing sparked debate among citizens and economic experts.',
    date: '2025-04-08',
    source: 'news',
    url: '#',
    sentiment: 'negative',
    member: 'NOROV ALTANKHUYAG'
  },
  {
    id: 3,
    title: 'Public reaction to tax proposal',
    content: 'Citizens criticized Altankhuyag\'s position on the new tax legislation in numerous comments on the Parliament\'s Facebook page.',
    date: '2025-04-07',
    source: 'facebook',
    url: '#',
    sentiment: 'negative',
    member: 'NOROV ALTANKHUYAG'
  },
  {
    id: 4,
    title: 'Environmental protection initiative',
    content: 'Aubakir\'s environmental protection bill received widespread support from environmental organizations and citizens on social media.',
    date: '2025-04-08',
    source: 'facebook',
    url: '#',
    sentiment: 'positive',
    member: 'TELUKHAN AUBAKIR'
  },
  {
    id: 5,
    title: 'Digital transformation policy debate',
    content: 'Bat-Amgalan\'s digital transformation policy received mixed reactions from technology experts and industry leaders.',
    date: '2025-04-07',
    source: 'twitter',
    url: '#',
    sentiment: 'neutral',
    member: 'ENKHTAIVAN BAT-AMGALAN'
  },
  {
    id: 6,
    title: 'Healthcare reform proposal',
    content: 'Batjargal\'s healthcare reform proposal was praised by medical professionals and patient advocacy groups.',
    date: '2025-04-08',
    source: 'facebook',
    url: '#',
    sentiment: 'positive',
    member: 'JIGJID BATJARGAL'
  },
  {
    id: 7,
    title: 'Education reform initiative launched',
    content: 'Deputy Chairman Bulgantuya introduced a comprehensive education reform package that aims to modernize Mongolia\'s education system.',
    date: '2025-04-09',
    source: 'news',
    url: '#',
    sentiment: 'positive',
    member: 'Khurelbaatar BULGANTUYA'
  }
];

const Search = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [memberFilter, setMemberFilter] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const t = translations[language];

  // Mock members list
  const members = [
    { id: 1, name: 'Dashzegve AMARBAYASGALAN' },
    { id: 2, name: 'Khurelbaatar BULGANTUYA' },
    { id: 3, name: 'NOROV ALTANKHUYAG' },
    { id: 4, name: 'SAINBUYAN AMARSAIKHAN' },
    { id: 5, name: 'TELUKHAN AUBAKIR' },
    { id: 6, name: 'ENKHTAIVAN BAT-AMGALAN' },
    { id: 7, name: 'Jadamba BAT-ERDENE' },
    { id: 8, name: 'JIGJID BATJARGAL' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Filter the mock results based on search criteria
    let results = [...mockResults];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(result => 
        result.title.toLowerCase().includes(term) || 
        result.content.toLowerCase().includes(term) ||
        result.member.toLowerCase().includes(term)
      );
    }
    
    // Apply date range filter
    if (dateFrom) {
      results = results.filter(result => result.date >= dateFrom);
    }
    
    if (dateTo) {
      results = results.filter(result => result.date <= dateTo);
    }
    
    // Apply platform filter
    if (platformFilter !== 'all') {
      results = results.filter(result => result.source === platformFilter);
    }
    
    // Apply sentiment filter
    if (sentimentFilter !== 'all') {
      results = results.filter(result => result.sentiment === sentimentFilter);
    }
    
    // Apply member filter
    if (memberFilter !== 'all') {
      results = results.filter(result => result.member === memberFilter);
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const getSentimentBadgeClass = (sentiment) => {
    if (sentiment === 'positive') return 'badge-positive';
    if (sentiment === 'neutral') return 'badge-neutral';
    return 'badge-negative';
  };

  const getSourceBadgeVariant = (source) => {
    if (source === 'news') return 'info';
    if (source === 'facebook') return 'primary';
    return 'secondary';
  };

  return (
    <Container fluid>
      <h1 className="mb-4">{t.title}</h1>
      
      <Row>
        <Col md={4} lg={3}>
          <Card className="mb-4">
            <Card.Header>{t.filters}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3">
                  <Form.Label>{t.dateRange}</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="date"
                        placeholder={t.from}
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="date"
                        placeholder={t.to}
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>{t.platform}</Form.Label>
                  <Form.Select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                  >
                    <option value="all">{t.all}</option>
                    <option value="news">{t.news}</option>
                    <option value="facebook">{t.facebook}</option>
                    <option value="twitter">{t.twitter}</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>{t.sentiment}</Form.Label>
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
                
                <Form.Group className="mb-3">
                  <Form.Label>{t.member}</Form.Label>
                  <Form.Select
                    value={memberFilter}
                    onChange={(e) => setMemberFilter(e.target.value)}
                  >
                    <option value="all">{t.allMembers}</option>
                    {members.map(member => (
                      <option key={member.id} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100">
                  {t.search}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8} lg={9}>
          <Card className="mb-4">
            <Card.Body>
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    {t.search}
                  </Button>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
          
          {hasSearched && (
            <Card>
              <Card.Header>
                {t.searchResults}
                {searchResults.length > 0 && (
                  <span className="ms-2 text-muted">
                    ({t.resultsCount.replace('{count}', searchResults.length)})
                  </span>
                )}
              </Card.Header>
              <Card.Body>
                {searchResults.length === 0 ? (
                  <div className="text-center py-5">
                    <p>{t.noResults}</p>
                  </div>
                ) : (
                  <ListGroup>
                    {searchResults.map(result => (
                      <ListGroup.Item key={result.id}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5>{result.title}</h5>
                            <p>{result.content}</p>
                            <div className="d-flex gap-2">
                              <Badge bg={getSourceBadgeVariant(result.source)}>
                                {result.source}
                              </Badge>
                              <span className="text-muted">{result.date}</span>
                              <span className="text-muted">{result.member}</span>
                            </div>
                          </div>
                          <Badge 
                            className={`sentiment-badge ${getSentimentBadgeClass(result.sentiment)}`}
                          >
                            {result.sentiment}
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
