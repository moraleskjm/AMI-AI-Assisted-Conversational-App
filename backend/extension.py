from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Response(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mode = db.Column(db.String(50), nullable=False, default='ami')
    sentiment_category = db.Column(db.String(50), nullable=False)
    response_text = db.Column(db.Text, nullable=False)
