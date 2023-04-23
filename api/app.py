from flask import Flask, jsonify, request
import pandas as pd
app = Flask(__name__)


@app.route('/')
def index():
    return 'Working'


@app.route('/save', methods=['POST'])
def save_data():
    file = request.files['file']
    customer_data = pd.read_csv(file)
    print(customer_data.head())

    return jsonify({'result': 'success'})
