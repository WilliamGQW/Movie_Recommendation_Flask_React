# app.py
from flask import Flask, render_template, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
import json

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'trial'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

#search should be a GET method
'''
post的模板
@app.route('/search', methods=['POST'])
def search():
    cur = mysql.connection.cursor()
    search_query = request.get_json()['name']
    
    #last_name = request.get_json()['last_name']
    #email = request.get_json()['email']
    #password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    #created = datetime.utcnow()
	
    cur.execute("INSERT INTO search_history (search_query) VALUES ('" + 
		str(search_query) + "')") 
        #+ "', '" + 
		#str(last_name) + "', '" + 
		#str(email) + "', '" + 
		#str(password) + "', '" + 
		#str(created) + "')")
    mysql.connection.commit()
	
    result = {
		'search_query' : search_query
	}
    
    ret= jsonify({'try' : search_query})
    return {'search_query':search_query}
'''
#search should be a GET method
@app.route('/search', methods=['GET'])
def search():
    cur = mysql.connection.cursor()
    #print(request)
    #print(type(request.get_json()))
    print(request.args)
    search_query = request.args.get("name")
    
    #last_name = request.get_json()['last_name']
    #email = request.get_json()['email']
    #password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    #created = datetime.utcnow()
	
    cur.execute("SELECT title, id, genres, vote_average FROM Movies WHERE title = '" + 
		str(search_query)+"'") 
    mysql.connection.commit()
	
    res = cur.fetchall()
    res = json.dumps(res)
    print(res)
    print(type(res))
    return res


if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)