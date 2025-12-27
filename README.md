Ami - AI Assisted Therapist API

Ami is an AI-assisted therapist built as a foundation for something bigger. I created this project because I know many people struggle with mental illness and need someone to talk to, but are too afraid to reach out to others because of the fear of judgment. Ami provides a safe space where people can express their feelings without the worry of being judged.

The app uses Google Cloud Natural Language AI to analyze the sentiment of user input, understanding how they feel, whether it's very negative or very positive. Based on this sentiment, it selects an appropriate response from a database of predefined feelings. The response is randomized, so it doesn't sound robotic or repetitive, making it feel like it's coming from a real AI. The idea is to make the interaction feel more natural and human-like.

This app is just the beginning. The goal is to continuously improve and expand it, adding new features like different modes (Dad, Mommy, Gen Z) for more fun interactions and more nuanced sentiment detection. Eventually, I plan to transition to Java and build out even more capabilities, all with the aim of helping people get the support they need, no matter what they’re going through.

Backend Notes
How It Works

The backend is built using Flask (Python) and provides an API that handles communication with the frontend.

The main functionality is to analyze the sentiment of user input using Google Cloud Natural Language API. Based on the sentiment, it selects an appropriate response from a pre-configured database.

The backend uses SQLAlchemy to handle database operations, with responses categorized by sentiment.

What Needs to Be Added/Modified

Google Cloud Key:

To use Google Cloud Natural Language API, set up your Google Cloud account, enable the Natural Language API, and create a service account.

Download the credentials JSON file and set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of your service account credentials file:

export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/credentials-file.json"


Database:

By default, the app uses SQLite for simplicity. If you want to scale or need more flexibility, you can switch to PostgreSQL or any other relational database of your choice.

To use PostgreSQL:

Install the necessary dependencies:

pip install psycopg2


Update the database URI in app.py:

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://username:password@localhost/dbname"


Set up your PostgreSQL database, create tables, and migrate the schema.

API Responses:

The backend provides responses based on sentiment. These responses are stored in the database and can be added or modified to suit your needs.

Frontend Notes
How It Works

The frontend is a simple React app that communicates with the backend API to send user input and display AMI's response.

It sends a POST request to the /ami endpoint with the user's message and mode (default is "ami").

AMI's response is then displayed in the chat interface.

What Needs to Be Added/Modified

API URL:

The frontend is set to communicate with the backend running on http://localhost:5000. If you're deploying the app, make sure to update this URL to the correct backend server.

User Interface:

The UI is simple and includes a chat input field and a send button. It currently has a basic structure, and you can expand it as needed, such as adding themes or more interactive elements.

Modes (Coming Soon):

The frontend allows for mode selection (e.g., "ami", "dad", "mommy", "genz"), but this feature isn't implemented yet in the backend. Once the backend supports different modes, this will allow AMI to respond in different styles based on the selected mode.
