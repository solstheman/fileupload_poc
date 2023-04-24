from flask import Flask, jsonify, request
import pandas as pd
from flask_mysqldb import MySQL
from flask_migrate import Migrate
app = Flask(__name__)

mysql = MySQL(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'fileuploader_poc'

migrate = Migrate(app, mysql)


@app.route('/migrate')
def index():
    create_tables()
    return 'success'


@app.route('/patient', methods=['POST'])
def patient():
    data = request.get_json()
    email = data.get('email')
    patient_data = get_patient_data(email)
    return jsonify(patient_data)


@app.route('/save', methods=['POST'])
def save_data():
    file = request.files['file']
    customer_data = pd.read_csv(file)
    print(customer_data.head())

    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO user_data (name, email) VALUES(%s,%s)''',
                   ('test', 'test@example.com'))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'result': 'success'})


def create_tables():
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' CREATE TABLE user_data (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(40), email VARCHAR(40))''')
    mysql.connection.commit()
    cursor.close()


def get_patient_data(email):
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' SELECT * FROM user_data WHERE email = %s''', [email])
    rows = cursor.fetchall()
    df = pd.DataFrame.from_records(
        rows, columns=[x[0] for x in cursor.description])
    cursor.close()
    return df.to_dict(orient='records')
