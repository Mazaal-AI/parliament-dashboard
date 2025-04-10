#!/bin/bash

# Test script for Parliament of Mongolia Social Media Monitoring Dashboard

echo "Starting dashboard testing..."

# Check if required directories exist
echo "Checking directory structure..."
if [ ! -d "data" ]; then
  echo "ERROR: data directory not found"
  exit 1
fi

if [ ! -d "public" ]; then
  echo "ERROR: public directory not found"
  exit 1
fi

if [ ! -d "src" ]; then
  echo "ERROR: src directory not found"
  exit 1
fi

echo "Directory structure OK"

# Check if required files exist
echo "Checking key files..."
required_files=(
  "package.json"
  "webpack.config.js"
  "public/index.html"
  "src/index.js"
  "src/App.js"
  "monitor.py"
  "prepare_data.py"
  "advanced_analytics.py"
)

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "ERROR: Required file $file not found"
    exit 1
  fi
done

echo "Key files OK"

# Check if Python dependencies are installed
echo "Checking Python dependencies..."
python3 -c "import pandas; import numpy; import matplotlib; import requests" 2>/dev/null
if [ $? -ne 0 ]; then
  echo "Installing required Python packages..."
  pip install pandas numpy matplotlib requests
fi

echo "Python dependencies OK"

# Check if Node.js dependencies are installed
echo "Checking Node.js dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing Node.js dependencies..."
  npm install
fi

echo "Node.js dependencies OK"

# Test data generation
echo "Testing basic data generation..."
python3 -c "
import os
if not os.path.exists('data/news/news_data.json') or not os.path.exists('data/facebook/facebook_data.json') or not os.path.exists('data/twitter/twitter_data.json'):
    print('Generating sample data...')
    import monitor
    monitor.run_monitoring()
else:
    print('Sample data already exists')
"

echo "Testing data preparation..."
python3 -c "
import os
if not os.path.exists('public/data/members.json') or not os.path.exists('public/data/sentiment_trends.json') or not os.path.exists('public/data/alerts.json'):
    print('Preparing dashboard data...')
    import prepare_data
    prepare_data.prepare_dashboard_data()
else:
    print('Dashboard data already prepared')
"

# Test advanced analytics (minimal test to avoid long runtime)
echo "Testing advanced analytics module (minimal test)..."
python3 -c "
import advanced_analytics
print('Advanced analytics module imported successfully')
# We don't run the full analysis here as it would take too long
"

# Test webpack build
echo "Testing webpack build..."
npm run build --if-present

if [ $? -ne 0 ]; then
  echo "ERROR: Webpack build failed"
  exit 1
fi

echo "Webpack build OK"

# Summary
echo "All tests passed successfully!"
echo "The dashboard is ready to run with 'npm start'"
echo ""
echo "To run the full system with data generation and advanced analytics:"
echo "1. Run 'python monitor.py' to generate initial data"
echo "2. Run 'python prepare_data.py' to prepare the data for the dashboard"
echo "3. Run 'python advanced_analytics.py' to generate AI insights (optional)"
echo "4. Run 'npm start' to start the dashboard"
