# Installation and Usage Instructions
# Parliament of Mongolia Social Media Monitoring Dashboard

## System Requirements

- **Operating System**: Linux, macOS, or Windows
- **Python**: Version 3.8 or higher
- **Node.js**: Version 16 or higher
- **RAM**: Minimum 4GB (8GB recommended for advanced AI features)
- **Disk Space**: Minimum 2GB free space

## Installation Instructions

### 1. Clone or Download the Repository

```bash
git clone https://github.com/mazaalai/parliament-dashboard.git
cd parliament-dashboard
```

Or extract the provided ZIP file:

```bash
unzip parliament-dashboard.zip
cd parliament-dashboard
```

### 2. Install Python Dependencies

```bash
pip install pandas numpy matplotlib requests nltk scikit-learn tensorflow wordcloud
```

For advanced AI features, additional dependencies are required:

```bash
pip install tensorflow keras nltk scikit-learn wordcloud
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet'); nltk.download('vader_lexicon')"
```

### 3. Install Node.js Dependencies

```bash
cd dashboard
npm install
```

## Usage Instructions

### 1. Data Collection and Processing

To generate sample data and prepare it for the dashboard:

```bash
# Generate initial data
python monitor.py

# Prepare data for the dashboard
python prepare_data.py
```

### 2. Advanced AI Analysis (Optional)

To run the advanced AI analytics module:

```bash
python advanced_analytics.py
```

Note: This process may take several minutes to complete as it performs complex analyses.

### 3. Start the Dashboard

```bash
npm start
```

The dashboard will be available at http://localhost:8080 in your web browser.

## Dashboard Features

### Basic Dashboard

1. **Overview Dashboard**: Shows overall sentiment, platform distribution, and recent alerts
2. **Members Page**: Lists all parliament members with sentiment scores and filtering options
3. **Member Detail**: Detailed view of individual parliament member's sentiment and mentions
4. **Alerts**: Real-time notifications about significant sentiment changes
5. **Search**: Advanced search functionality across all monitored content
6. **Reports**: Generate custom reports with various parameters

### Advanced Dashboard (with AI Features)

1. **All Basic Features**: Includes all features from the basic dashboard
2. **AI Insights**: Advanced analytics powered by machine learning
3. **Topic Modeling**: Automatic identification of trending topics
4. **Network Analysis**: Visualization of relationships between members and topics
5. **Sentiment Prediction**: AI-powered forecasting of future sentiment trends
6. **AI Chatbot**: Interactive assistant for querying dashboard data

## Configuration

The dashboard can be configured by editing the following files:

- `config.json`: General configuration settings
- `monitor_config.json`: Data collection settings
- `ai_config.json`: AI feature settings

## Troubleshooting

If you encounter any issues:

1. Check that all dependencies are correctly installed
2. Ensure data directories have proper permissions
3. Check the logs in the `logs` directory
4. Run the test script to verify system integrity:

```bash
./test_dashboard.sh
```

## Support

For technical support, please contact:
- Email: support@mazaalai.com
- Phone: +976 12345678

## License

This software is proprietary and confidential. Unauthorized copying, transferring or reproduction of the contents of this software is strictly prohibited.

© 2025 Mazaal AI. All rights reserved.
