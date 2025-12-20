from google.cloud import language_v1
from extension import Response
import random
import os


def analyze_message(text, mode = "ami"):

    client = language_v1.LanguageServiceClient()

    #Create Document
    document = language_v1.Document(content=text, type=language_v1.Document.Type.PLAIN_TEXT)

    #Sentiment Analysis
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment

    if -1.0 <= sentiment.score <= -0.6:
        category = "very_negative"

    elif -0.6 < sentiment.score <= -0.2:
        category = "negative"

    elif -0.2 < sentiment.score < 0.2:
        category = "neutral"

    elif 0.2 <= sentiment.score < 0.6:
        category = "positive"

    elif 0.6 <= sentiment.score <= 1.0:
        category = "very_positive"

    responses = Response.query.filter_by(
        mode = mode,
        sentiment_category = category
    ).all()

    if responses:
        bot_response = random.choice(responses).response_text
    else:
        bot_response = "I'm here to listen."

    return bot_response