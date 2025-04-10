#!/bin/bash

# Script to set up and run the Parliament of Mongolia Social Media Monitoring Dashboard

echo "Setting up Parliament of Mongolia Social Media Monitoring Dashboard..."

# Create necessary directories
mkdir -p data/news data/facebook data/twitter data/visualizations public/data

# Install required Python packages
echo "Installing Python dependencies..."
pip install pandas matplotlib numpy requests

# Run the monitoring script to generate initial data
echo "Running monitoring script to collect initial data..."
python monitor.py

# Prepare data for the dashboard
echo "Preparing dashboard data..."
python prepare_data.py

# Start the dashboard
echo "Starting the dashboard..."
npm start

echo "Dashboard setup complete and running!"
