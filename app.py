# app.py
from flask import Flask, render_template, jsonify, request, json
from flask_mysqldb import MySQL
from flask_sqlalchemy import sqlalchemy
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
import json
import sqlite3
import csv

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

conn = sqlite3.connect("Movie.db")
curs = conn.cursor()
curs.execute("DROP TABLE IF EXISTS Movies;")
curs.execute("CREATE TABLE IF NOT EXISTS Movies (genres TEXT, id INTEGER PRIMARY KEY, original_language TEXT, overview TEXT, popularity REAL, release_year INTEGER, runtime INTEGER, title TEXT,	vote_average REAL, vote_count INTEGER, actors TEXT, director TEXT);")
# https://stackoverflow.com/questions/2887878/importing-a-csv-file-into-a-sqlite3-database-table-using-python/2888042#2888042
with open('dataset/Movies_cleaned.csv', 'r') as fin:  # `with` statement available in 2.5+
    # csv.DictReader uses first line in file for column headings by default
    dr = csv.DictReader(fin)  # comma is default delimiter
    to_db = [(i['genres'], i['id'], i['original_language'], i['overview'], i['popularity'], i['release_year'],
              i['runtime'], i['title'], i['vote_average'], i['vote_count'], i['actors'], i['director']) for i in dr]
curs.executemany("INSERT INTO Movies (genres, id, original_language, overview, popularity, release_year, runtime, title, vote_average, vote_count, actors, director) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?);", to_db)
conn.commit()

curs.execute("SELECT title FROM Movies WHERE vote_average > 7")
# curs.execute("SELECT count(*) FROM Movies WHERE vote_average > 7")
print("---------------TEST QUERY---------------")
print(curs.fetchall())

conn.close()


@app.route('/')
def index():
    return render_template('index.html')


# search should be a GET method
'''
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
# search should be a GET method


@app.route('/search', methods=['GET'])
def search():
    # cur = mysql.connection.cursor()
    # print(request)
    # print(type(request.get_json()))
    # print(request.args)
    conn = sqlite3.connect("Movie.db")
    print("-------connected to db--------")
    cur = conn.cursor()
    search_query = request.args.get("name")

    #last_name = request.get_json()['last_name']
    #email = request.get_json()['email']
    #password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    #created = datetime.utcnow()

    cur.execute("SELECT title, id, genres, vote_average FROM Movies WHERE title like '%" +
                str(search_query)+"%'")
    # mysql.connection.commit()

    res = cur.fetchall()
    res = json.dumps(res)
    print(res)
    print(type(res))
    return res

# log in: to be completed

# register: to be completed

# logout: to be completed

#select movie info in this order [GET]                
'''
        title: res[0],
        id: res[1],
        genres: res[2],
        release_year: res[3],
        vote_average: res[4],
        original_language: res[5],
        runtime: res[6],
        directors: res[7],
        actors: res[8],
        overview: res[9]
'''
@app.route('/getMovieInfo', methods=['GET'])
def getMovieInfo():
    
    conn = sqlite3.connect("Movie.db")
    print("-------connected to db--------")
    cur = conn.cursor()
    mvId = request.args.get("mvId")

    cur.execute("SELECT title, id, genres, release_year, vote_average, original_language, runtime, director, actors, overview FROM Movies WHERE id = " +
                str(mvId)+"")

    res = cur.fetchall()
    res = json.dumps(res)
    print(res)
    print(type(res))
    return res



#check user favorite table[GET]
'''
email = request.args.get("userId")
mvId = request.args.get("mvId")
'''

#insert into fav table [POST]

#delete from fav table [DELETE]


if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
