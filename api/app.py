from flask import Flask, jsonify, request
app = Flask(__name__)


@app.route('/')
def index():
    return 'Working'


@app.route('/save', methods=['POST'])
def save_data():
    data = request.files['file']
    print(data)
    return jsonify({})
