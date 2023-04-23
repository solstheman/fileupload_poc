from flask import Flask, jsonify, request
import pandas as pd
app = Flask(__name__)


@app.route('/')
def index():
    return 'Working'


@app.route('/save', methods=['POST'])
def save_data():
    file = request.files['file']
    df = pd.read_csv(file)
    print(df.head())
    return jsonify({})
