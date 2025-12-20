from flask import Flask, request, jsonify
from flask_cors import CORS
from extension import db
from therapist import analyze_message

app = Flask(__name__)
CORS(app)

#Db Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///therapist.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
@app.route('/ami', methods=['POST'])
def ami():
    data = request.get_json()
    message = data['message']
    mode = data.get('mode', 'ami')

    bot_response = analyze_message(message, mode)

    return jsonify(({'response': bot_response}))


if __name__ == '__main__':
    # Create tables
    with app.app_context():
        db.create_all()
    app.run(debug=True)