import requests
import json
import pandas as pd
import time
from datetime import datetime, timedelta
import os

# Create directories for data if they don't exist
os.makedirs('data/news', exist_ok=True)
os.makedirs('data/facebook', exist_ok=True)
os.makedirs('data/twitter', exist_ok=True)

# Mock function to simulate fetching news data
def fetch_news_data():
    print("Fetching news data from 30 news sites...")
    
    # In a real implementation, this would use PolitePol or a similar service
    # to scrape news sites. For this demo, we'll create mock data.
    
    news_data = []
    
    # List of mock news sites
    news_sites = [
        "UBPost", "Montsame", "GoGo.mn", "News.mn", "Ikon.mn",
        "Unuudur", "Zuunii Medee", "Daily News", "The UB Times", "Mongolia Today",
        "Eagle News", "Mongolian Economy", "Business Mongolia", "Mining Mongolia", "Politics Mongolia",
        "Sports Mongolia", "Tech Mongolia", "Health Mongolia", "Education Mongolia", "Environment Mongolia",
        "Finance Mongolia", "Tourism Mongolia", "Culture Mongolia", "Agriculture Mongolia", "Energy Mongolia",
        "Infrastructure Mongolia", "Foreign Affairs Mongolia", "Legal Mongolia", "Social Mongolia", "Regional Mongolia"
    ]
    
    # List of parliament members
    members = [
        "Dashzegve AMARBAYASGALAN", "Khurelbaatar BULGANTUYA", "NOROV ALTANKHUYAG",
        "SAINBUYAN AMARSAIKHAN", "TELUKHAN AUBAKIR", "ENKHTAIVAN BAT-AMGALAN",
        "Jadamba BAT-ERDENE", "JIGJID BATJARGAL"
    ]
    
    # List of topics
    topics = [
        "Economic Policy", "Healthcare Reform", "Environmental Protection", "Foreign Relations",
        "Budget Debate", "Education Reform", "Digital Transformation", "Cultural Heritage"
    ]
    
    # Generate mock news data
    for site in news_sites:
        # Each site has approximately 10 posts
        for _ in range(10):
            # Randomly select a member and topic
            member = members[int(time.time() * 1000) % len(members)]
            topic = topics[int(time.time() * 1000) % len(topics)]
            
            # Generate a mock sentiment score (0-1)
            sentiment = round((time.time() * 1000) % 100) / 100
            
            # Create a mock news item
            news_item = {
                "site": site,
                "title": f"{topic} discussion in Parliament",
                "content": f"The Parliament member {member} discussed {topic} during the session. The discussion focused on various aspects of the policy and its implementation.",
                "url": f"https://{site.lower().replace(' ', '')}.mn/news/{int(time.time() * 1000)}",
                "date": (datetime.now() - timedelta(hours=int(time.time() * 10) % 24)).strftime("%Y-%m-%d %H:%M:%S"),
                "member": member,
                "topic": topic,
                "sentiment": sentiment
            }
            
            news_data.append(news_item)
            
            # Small delay to ensure different timestamps and random values
            time.sleep(0.01)
    
    # Save the data to a JSON file
    with open('data/news/news_data.json', 'w') as f:
        json.dump(news_data, f, indent=2)
    
    print(f"Collected {len(news_data)} news items from {len(news_sites)} sites")
    return news_data

# Mock function to simulate fetching Facebook data
def fetch_facebook_data():
    print("Fetching Facebook data from 130 pages...")
    
    # In a real implementation, this would use Apify or a similar service
    # to collect Facebook data. For this demo, we'll create mock data.
    
    facebook_data = []
    
    # Generate mock Facebook page names
    facebook_pages = []
    for i in range(1, 131):
        facebook_pages.append(f"Mongolia_Page_{i}")
    
    # List of parliament members
    members = [
        "Dashzegve AMARBAYASGALAN", "Khurelbaatar BULGANTUYA", "NOROV ALTANKHUYAG",
        "SAINBUYAN AMARSAIKHAN", "TELUKHAN AUBAKIR", "ENKHTAIVAN BAT-AMGALAN",
        "Jadamba BAT-ERDENE", "JIGJID BATJARGAL"
    ]
    
    # List of topics
    topics = [
        "Economic Policy", "Healthcare Reform", "Environmental Protection", "Foreign Relations",
        "Budget Debate", "Education Reform", "Digital Transformation", "Cultural Heritage"
    ]
    
    # Generate mock Facebook data
    for page in facebook_pages:
        # Each page has approximately 10 posts
        for _ in range(10):
            # Randomly select a member and topic
            member = members[int(time.time() * 1000) % len(members)]
            topic = topics[int(time.time() * 1000) % len(topics)]
            
            # Generate a mock sentiment score (0-1)
            post_sentiment = round((time.time() * 1000) % 100) / 100
            
            # Create a mock Facebook post
            post = {
                "page": page,
                "post_id": f"{page}_{int(time.time() * 1000)}",
                "content": f"Discussion about {topic} in Parliament. {member} made some interesting points today.",
                "url": f"https://facebook.com/{page}/posts/{int(time.time() * 1000)}",
                "date": (datetime.now() - timedelta(hours=int(time.time() * 10) % 24)).strftime("%Y-%m-%d %H:%M:%S"),
                "member": member,
                "topic": topic,
                "sentiment": post_sentiment,
                "likes": int(time.time() * 10) % 500,
                "shares": int(time.time() * 10) % 100,
                "comments": []
            }
            
            # Generate mock comments (around 100 per post)
            num_comments = 90 + int(time.time() * 10) % 20
            for j in range(num_comments):
                comment_sentiment = round((time.time() * 1000) % 100) / 100
                
                comment = {
                    "comment_id": f"{post['post_id']}_{j}",
                    "content": f"I {'agree' if comment_sentiment > 0.5 else 'disagree'} with {member}'s position on {topic}. {'This is good for Mongolia.' if comment_sentiment > 0.5 else 'This needs more consideration.'}",
                    "date": (datetime.now() - timedelta(hours=int(time.time() * 10) % 12, minutes=int(time.time() * 100) % 60)).strftime("%Y-%m-%d %H:%M:%S"),
                    "sentiment": comment_sentiment,
                    "likes": int(time.time() * 10) % 50
                }
                
                post["comments"].append(comment)
                
                # Small delay to ensure different timestamps and random values
                time.sleep(0.001)
            
            facebook_data.append(post)
            
            # Small delay to ensure different timestamps and random values
            time.sleep(0.01)
    
    # Save the data to a JSON file
    with open('data/facebook/facebook_data.json', 'w') as f:
        json.dump(facebook_data, f, indent=2)
    
    print(f"Collected {len(facebook_data)} posts with approximately {len(facebook_data) * 100} comments from {len(facebook_pages)} Facebook pages")
    return facebook_data

# Mock function to simulate fetching Twitter data
def fetch_twitter_data():
    print("Fetching Twitter data from 10 accounts...")
    
    # In a real implementation, this would use Apify or a similar service
    # to collect Twitter data. For this demo, we'll create mock data.
    
    twitter_data = []
    
    # Generate mock Twitter account names
    twitter_accounts = []
    for i in range(1, 11):
        twitter_accounts.append(f"Mongolia_Account_{i}")
    
    # List of parliament members
    members = [
        "Dashzegve AMARBAYASGALAN", "Khurelbaatar BULGANTUYA", "NOROV ALTANKHUYAG",
        "SAINBUYAN AMARSAIKHAN", "TELUKHAN AUBAKIR", "ENKHTAIVAN BAT-AMGALAN",
        "Jadamba BAT-ERDENE", "JIGJID BATJARGAL"
    ]
    
    # List of topics
    topics = [
        "Economic Policy", "Healthcare Reform", "Environmental Protection", "Foreign Relations",
        "Budget Debate", "Education Reform", "Digital Transformation", "Cultural Heritage"
    ]
    
    # Generate mock Twitter data
    for account in twitter_accounts:
        # Each account has approximately 10 tweets
        for _ in range(10):
            # Randomly select a member and topic
            member = members[int(time.time() * 1000) % len(members)]
            topic = topics[int(time.time() * 1000) % len(topics)]
            
            # Generate a mock sentiment score (0-1)
            tweet_sentiment = round((time.time() * 1000) % 100) / 100
            
            # Create a mock tweet
            tweet = {
                "account": account,
                "tweet_id": f"{account}_{int(time.time() * 1000)}",
                "content": f"#{topic.replace(' ', '')} #{member.split(' ')[1]} Parliament discussion today was {'productive' if tweet_sentiment > 0.5 else 'concerning'}. #Mongolia #Parliament",
                "url": f"https://twitter.com/{account}/status/{int(time.time() * 1000)}",
                "date": (datetime.now() - timedelta(hours=int(time.time() * 10) % 24)).strftime("%Y-%m-%d %H:%M:%S"),
                "member": member,
                "topic": topic,
                "sentiment": tweet_sentiment,
                "likes": int(time.time() * 10) % 200,
                "retweets": int(time.time() * 10) % 50,
                "replies": []
            }
            
            # Generate mock replies (around 20 per tweet)
            num_replies = 15 + int(time.time() * 10) % 10
            for j in range(num_replies):
                reply_sentiment = round((time.time() * 1000) % 100) / 100
                
                reply = {
                    "reply_id": f"{tweet['tweet_id']}_{j}",
                    "content": f"{'I support' if reply_sentiment > 0.5 else 'I question'} {member}'s stance on {topic}. {'Good initiative!' if reply_sentiment > 0.7 else 'Needs improvement.' if reply_sentiment > 0.4 else 'Completely disagree.'}",
                    "date": (datetime.now() - timedelta(hours=int(time.time() * 10) % 12, minutes=int(time.time() * 100) % 60)).strftime("%Y-%m-%d %H:%M:%S"),
                    "sentiment": reply_sentiment,
                    "likes": int(time.time() * 10) % 30
                }
                
                tweet["replies"].append(reply)
                
                # Small delay to ensure different timestamps and random values
                time.sleep(0.001)
            
            twitter_data.append(tweet)
            
            # Small delay to ensure different timestamps and random values
            time.sleep(0.01)
    
    # Save the data to a JSON file
    with open('data/twitter/twitter_data.json', 'w') as f:
        json.dump(twitter_data, f, indent=2)
    
    print(f"Collected {len(twitter_data)} tweets with approximately {len(twitter_data) * 20} replies from {len(twitter_accounts)} Twitter accounts")
    return twitter_data

# Function to perform basic sentiment analysis
def analyze_sentiment(data_type, data):
    print(f"Performing sentiment analysis on {data_type} data...")
    
    # In a real implementation, this would use a more sophisticated sentiment analysis model.
    # For this demo, we'll use the mock sentiment scores already generated.
    
    # Calculate overall sentiment
    if data_type == 'news':
        overall_sentiment = sum(item['sentiment'] for item in data) / len(data)
        print(f"Overall sentiment for news: {overall_sentiment:.2f}")
        
    elif data_type == 'facebook':
        # Calculate post sentiment
        post_sentiment = sum(post['sentiment'] for post in data) / len(data)
        
        # Calculate comment sentiment
        all_comments = []
        for post in data:
            all_comments.extend(post['comments'])
        
        comment_sentiment = sum(comment['sentiment'] for comment in all_comments) / len(all_comments)
        
        overall_sentiment = (post_sentiment + comment_sentiment) / 2
        print(f"Overall sentiment for Facebook: {overall_sentiment:.2f}")
        print(f"Post sentiment: {post_sentiment:.2f}, Comment sentiment: {comment_sentiment:.2f}")
        
    elif data_type == 'twitter':
        # Calculate tweet sentiment
        tweet_sentiment = sum(tweet['sentiment'] for tweet in data) / len(data)
        
        # Calculate reply sentiment
        all_replies = []
        for tweet in data:
            all_replies.extend(tweet['replies'])
        
        reply_sentiment = sum(reply['sentiment'] for reply in all_replies) / len(all_replies)
        
        overall_sentiment = (tweet_sentiment + reply_sentiment) / 2
        print(f"Overall sentiment for Twitter: {overall_sentiment:.2f}")
        print(f"Tweet sentiment: {tweet_sentiment:.2f}, Reply sentiment: {reply_sentiment:.2f}")
    
    return overall_sentiment

# Function to analyze mentions by member
def analyze_member_mentions(news_data, facebook_data, twitter_data):
    print("Analyzing mentions by parliament member...")
    
    # List of parliament members
    members = [
        "Dashzegve AMARBAYASGALAN", "Khurelbaatar BULGANTUYA", "NOROV ALTANKHUYAG",
        "SAINBUYAN AMARSAIKHAN", "TELUKHAN AUBAKIR", "ENKHTAIVAN BAT-AMGALAN",
        "Jadamba BAT-ERDENE", "JIGJID BATJARGAL"
    ]
    
    member_mentions = {}
    
    # Initialize member mentions
    for member in members:
        member_mentions[member] = {
            'total': 0,
            'news': 0,
            'facebook': 0,
            'twitter': 0,
            'sentiment': {
                'overall': 0,
                'news': 0,
                'facebook': 0,
                'twitter': 0
            }
        }
    
    # Count mentions in news
    for item in news_data:
        member = item['member']
        member_mentions[member]['total'] += 1
        member_mentions[member]['news'] += 1
        member_mentions[member]['sentiment']['news'] += item['sentiment']
    
    # Count mentions in Facebook posts
    for post in facebook_data:
        member = post['member']
        member_mentions[member]['total'] += 1
        member_mentions[member]['facebook'] += 1
        member_mentions[member]['sentiment']['facebook'] += post['sentiment']
        
        # Count mentions in Facebook comments
        for comment in post['comments']:
            if any(m in comment['content'] for m in members):
                for m in members:
                    if m in comment['content']:
                        member_mentions[m]['total'] += 1
                        member_mentions[m]['facebook'] += 1
                        member_mentions[m]['sentiment']['facebook'] += comment['sentiment']
    
    # Count mentions in Twitter tweets
    for tweet in twitter_data:
        member = tweet['member']
        member_mentions[member]['total'] += 1
        member_mentions[member]['twitter'] += 1
        member_mentions[member]['sentiment']['twitter'] += tweet['sentiment']
        
        # Count mentions in Twitter replies
        for reply in tweet['replies']:
            if any(m in reply['content'] for m in members):
                for m in members:
                    if m in reply['content']:
                        member_mentions[m]['total'] += 1
                        member_mentions[m]['twitter'] += 1
                        member_mentions[m]['sentiment']['twitter'] += reply['sentiment']
    
    # Calculate average sentiment
    for member in members:
        if member_mentions[member]['news'] > 0:
            member_mentions[member]['sentiment']['news'] /= member_mentions[member]['news']
        
        if member_mentions[member]['facebook'] > 0:
            member_mentions[member]['sentiment']['facebook'] /= member_mentions[member]['facebook']
        
        if member_mentions[member]['twitter'] > 0:
            member_mentions[member]['sentiment']['twitter'] /= member_mentions[member]['twitter']
        
        if member_mentions[member]['total'] > 0:
            member_mentions[member]['sentiment']['overall'] = (
                member_mentions[member]['sentiment']['news'] * member_mentions[member]['news'] +
                member_mentions[member]['sentiment']['facebook'] * member_mentions[member]['facebook'] +
                member_mentions[member]['sentiment']['twitter'] * member_mentions[member]['twitter']
            ) / member_mentions[member]['total']
    
    # Save the data to a JSON file
    with open('data/member_mentions.json', 'w') as f:
        json.dump(member_mentions, f, indent=2)
    
    # Print summary
    print("\nMember Mentions Summary:")
    for member, data in member_mentions.items():
        print(f"{member}: {data['total']} mentions (News: {data['news']}, Facebook: {data['facebook']}, Twitter: {data['twitter']})")
        print(f"  Sentiment: {data['sentiment']['overall']:.2f} (News: {data['sentiment']['news']:.2f}, Facebook: {data['sentiment']['facebook']:.2f}, Twitter: {data['sentiment']['twitter']:.2f})")
    
    return member_mentions

# Function to analyze topics
def analyze_topics(news_data, facebook_data, twitter_data):
    print("Analyzing topics...")
    
    # List of topics
    topics = [
        "Economic Policy", "Healthcare Reform", "Environmental Protection", "Foreign Relations",
        "Budget Debate", "Education Reform", "Digital Transformation", "Cultural Heritage"
    ]
    
    topic_mentions = {}
    
    # Initialize topic mentions
    for topic in topics:
        topic_mentions[topic] = {
            'total': 0,
            'news': 0,
            'facebook': 0,
            'twitter': 0,
            'sentiment': {
                'overall': 0,
                'news': 0,
                'facebook': 0,
                'twitter': 0
            }
        }
    
    # Count mentions in news
    for item in news_data:
        topic = item['topic']
        topic_mentions[topic]['total'] += 1
        topic_mentions[topic]['news'] += 1
        topic_mentions[topic]['sentiment']['news'] += item['sentiment']
    
    # Count mentions in Facebook posts
    for post in facebook_data:
        topic = post['topic']
        topic_mentions[topic]['total'] += 1
        topic_mentions[topic]['facebook'] += 1
        topic_mentions[topic]['sentiment']['facebook'] += post['sentiment']
    
    # Count mentions in Twitter tweets
    for tweet in twitter_data:
        topic = tweet['topic']
        topic_mentions[topic]['total'] += 1
        topic_mentions[topic]['twitter'] += 1
        topic_mentions[topic]['sentiment']['twitter'] += tweet['sentiment']
    
    # Calculate average sentiment
    for topic in topics:
        if topic_mentions[topic]['news'] > 0:
            topic_mentions[topic]['sentiment']['news'] /= topic_mentions[topic]['news']
        
        if topic_mentions[topic]['facebook'] > 0:
            topic_mentions[topic]['sentiment']['facebook'] /= topic_mentions[topic]['facebook']
        
        if topic_mentions[topic]['twitter'] > 0:
            topic_mentions[topic]['sentiment']['twitter'] /= topic_mentions[topic]['twitter']
        
        if topic_mentions[topic]['total'] > 0:
            topic_mentions[topic]['sentiment']['overall'] = (
                topic_mentions[topic]['sentiment']['news'] * topic_mentions[topic]['news'] +
                topic_mentions[topic]['sentiment']['facebook'] * topic_mentions[topic]['facebook'] +
                topic_mentions[topic]['sentiment']['twitter'] * topic_mentions[topic]['twitter']
            ) / topic_mentions[topic]['total']
    
    # Save the data to a JSON file
    with open('data/topic_mentions.json', 'w') as f:
        json.dump(topic_mentions, f, indent=2)
    
    # Print summary
    print("\nTopic Mentions Summary:")
    for topic, data in topic_mentions.items():
        print(f"{topic}: {data['total']} mentions (News: {data['news']}, Facebook: {data['facebook']}, Twitter: {data['twitter']})")
        print(f"  Sentiment: {data['sentiment']['overall']:.2f} (News: {data['sentiment']['news']:.2f}, Facebook: {data['sentiment']['facebook']:.2f}, Twitter: {data['sentiment']['twitter']:.2f})")
    
    return topic_mentions

# Function to generate alerts
def generate_alerts(news_data, facebook_data, twitter_data, member_mentions):
    print("Generating alerts...")
    
    alerts = []
    
    # Generate alerts for significant sentiment changes
    for member, data in member_mentions.items():
        # Mock previous sentiment (slightly different from current)
        prev_sentiment = max(0, min(1, data['sentiment']['overall'] + (0.1 if data['sentiment']['overall'] < 0.5 else -0.1)))
        
        # Alert for significant negative sentiment
        if data['sentiment']['overall'] < 0.4 and data['total'] > 10:
            alerts.append({
                'id': len(alerts) + 1,
                'title': f"Negative sentiment for {member}",
                'description': f"Overall sentiment for {member} is negative ({data['sentiment']['overall']:.2f}) across {data['total']} mentions.",
                'date': datetime.now().strftime("%Y-%m-%d"),
                'time': datetime.now().strftime("%H:%M"),
                'priority': 'high',
                'source': 'all',
                'sentiment': 'negative',
                'members': [member],
                'read': False
            })
        
        # Alert for significant sentiment drop
        if data['sentiment']['overall'] < prev_sentiment - 0.15 and data['total'] > 5:
            alerts.append({
                'id': len(alerts) + 1,
                'title': f"Sentiment drop for {member}",
                'description': f"Sentiment for {member} has dropped from {prev_sentiment:.2f} to {data['sentiment']['overall']:.2f}.",
                'date': datetime.now().strftime("%Y-%m-%d"),
                'time': datetime.now().strftime("%H:%M"),
                'priority': 'medium',
                'source': 'all',
                'sentiment': 'negative',
                'members': [member],
                'read': False
            })
        
        # Alert for high positive sentiment
        if data['sentiment']['overall'] > 0.7 and data['total'] > 10:
            alerts.append({
                'id': len(alerts) + 1,
                'title': f"Positive sentiment for {member}",
                'description': f"Overall sentiment for {member} is very positive ({data['sentiment']['overall']:.2f}) across {data['total']} mentions.",
                'date': datetime.now().strftime("%Y-%m-%d"),
                'time': datetime.now().strftime("%H:%M"),
                'priority': 'medium',
                'source': 'all',
                'sentiment': 'positive',
                'members': [member],
                'read': False
            })
    
    # Generate alerts for high-engagement content
    # Facebook posts with many comments
    for post in facebook_data:
        if len(post['comments']) > 120:
            alerts.append({
                'id': len(alerts) + 1,
                'title': f"High engagement Facebook post about {post['member']}",
                'description': f"A Facebook post about {post['member']} and {post['topic']} has received {len(post['comments'])} comments.",
                'date': datetime.now().strftime("%Y-%m-%d"),
                'time': datetime.now().strftime("%H:%M"),
                'priority': 'medium',
                'source': 'facebook',
                'sentiment': 'neutral',
                'members': [post['member']],
                'read': False
            })
    
    # Twitter tweets with many replies
    for tweet in twitter_data:
        if len(tweet['replies']) > 25:
            alerts.append({
                'id': len(alerts) + 1,
                'title': f"High engagement tweet about {tweet['member']}",
                'description': f"A tweet about {tweet['member']} and {tweet['topic']} has received {len(tweet['replies'])} replies.",
                'date': datetime.now().strftime("%Y-%m-%d"),
                'time': datetime.now().strftime("%H:%M"),
                'priority': 'low',
                'source': 'twitter',
                'sentiment': 'neutral',
                'members': [tweet['member']],
                'read': False
            })
    
    # Save the alerts to a JSON file
    with open('data/alerts.json', 'w') as f:
        json.dump(alerts, f, indent=2)
    
    print(f"Generated {len(alerts)} alerts")
    return alerts

# Main function to run the monitoring process
def run_monitoring():
    print("Starting social media monitoring for Parliament of Mongolia...")
    
    # Fetch data from different sources
    news_data = fetch_news_data()
    facebook_data = fetch_facebook_data()
    twitter_data = fetch_twitter_data()
    
    # Perform sentiment analysis
    news_sentiment = analyze_sentiment('news', news_data)
    facebook_sentiment = analyze_sentiment('facebook', facebook_data)
    twitter_sentiment = analyze_sentiment('twitter', twitter_data)
    
    # Calculate overall sentiment
    total_items = len(news_data) + len(facebook_data) + len(twitter_data)
    overall_sentiment = (news_sentiment * len(news_data) + 
                         facebook_sentiment * len(facebook_data) + 
                         twitter_sentiment * len(twitter_data)) / total_items
    
    print(f"\nOverall sentiment across all platforms: {overall_sentiment:.2f}")
    
    # Analyze mentions by member
    member_mentions = analyze_member_mentions(news_data, facebook_data, twitter_data)
    
    # Analyze topics
    topic_mentions = analyze_topics(news_data, facebook_data, twitter_data)
    
    # Generate alerts
    alerts = generate_alerts(news_data, facebook_data, twitter_data, member_mentions)
    
    # Generate sentiment trends (mock data for 7 days)
    generate_sentiment_trends(news_sentiment, facebook_sentiment, twitter_sentiment, topic_mentions)
    
    print("\nMonitoring completed successfully!")

# Function to generate sentiment trends
def generate_sentiment_trends(news_sentiment, facebook_sentiment, twitter_sentiment, topic_mentions):
    print("Generating sentiment trends...")
    
    sentiment_trends = []
    
    # Generate data for the past 7 days
    for i in range(7):
        date = (datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d")
        
        # Add small variations to sentiment for previous days
        variation = (7 - i) * 0.01
        day_news_sentiment = max(0, min(1, news_sentiment - variation + (0.02 * (i % 3 - 1))))
        day_facebook_sentiment = max(0, min(1, facebook_sentiment - variation + (0.02 * ((i+1) % 3 - 1))))
        day_twitter_sentiment = max(0, min(1, twitter_sentiment - variation + (0.02 * ((i+2) % 3 - 1))))
        
        # Calculate overall sentiment
        day_overall_sentiment = (day_news_sentiment + day_facebook_sentiment + day_twitter_sentiment) / 3
        
        # Get top topics for the day
        top_topics = []
        for topic, data in sorted(topic_mentions.items(), key=lambda x: x[1]['total'], reverse=True)[:5]:
            # Add small variations to topic sentiment and count
            topic_sentiment = max(0, min(1, data['sentiment']['overall'] - variation + (0.03 * (i % 3 - 1))))
            topic_count = max(1, int(data['total'] / 7) - i * 2 + (i % 3))
            
            top_topics.append({
                "topic": topic,
                "count": topic_count,
                "sentiment": topic_sentiment
            })
        
        day_data = {
            "date": date,
            "overall": day_overall_sentiment,
            "news": day_news_sentiment,
            "facebook": day_facebook_sentiment,
            "twitter": day_twitter_sentiment,
            "topTopics": top_topics
        }
        
        sentiment_trends.append(day_data)
    
    # Save the data to a JSON file
    with open('data/sentiment_trends.json', 'w') as f:
        json.dump(sentiment_trends, f, indent=2)
    
    print(f"Generated sentiment trends for the past 7 days")

# Run the monitoring process
if __name__ == "__main__":
    run_monitoring()
