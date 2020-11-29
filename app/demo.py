import csv
import sqlite3
import json
from flask_login import LoginManager
from flask_login import login_user, logout_user, current_user, login_required
from flask_jwt_extended import (create_access_token)
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, url_for, request, redirect, flash, jsonify
import requests

print("??????????????????????????????/")
conn = sqlite3.connect("Movie.db")
curs = conn.cursor()
# curs.execute("DROP TABLE IF EXISTS Movies;")
# curs.execute("CREATE TABLE IF NOT EXISTS Movies (genres TEXT, id INTEGER PRIMARY KEY, original_language TEXT, overview TEXT, popularity REAL, release_year INTEGER, runtime INTEGER, title TEXT,	vote_average REAL, vote_count INTEGER, actors TEXT, director TEXT);")
# # https://stackoverflow.com/questions/2887878/importing-a-csv-file-into-a-sqlite3-database-table-using-python/2888042#2888042
# with open('dataset/Movies_cleaned.csv', 'r') as fin:  # `with` statement available in 2.5+
#     # csv.DictReader uses first line in file for column headings by default
#     dr = csv.DictReader(fin)  # comma is default delimiter
#     to_db = [(i['genres'], i['id'], i['original_language'], i['overview'], i['popularity'], i['release_year'],
#               i['runtime'], i['title'], i['vote_average'], i['vote_count'], i['actors'], i['director']) for i in dr]
# curs.executemany("INSERT INTO Movies (genres, id, original_language, overview, popularity, release_year, runtime, title, vote_average, vote_count, actors, director) VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?);", to_db)
# conn.commit()

curs.execute("SELECT title FROM Movies WHERE vote_average > 7")
# curs.execute("SELECT count(*) FROM Movies WHERE vote_average > 7")
print("---------------TEST QUERY---------------")
print(curs.fetchall())
conn.close()
