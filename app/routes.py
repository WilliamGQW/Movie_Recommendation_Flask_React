import csv
import sqlite3
import json
from . import app, db, bcrypt, jwt
from app.models import User, FavMovie
from app.forms import LoginForm, SignupForm
from flask_login import LoginManager
from flask_login import login_user, logout_user, current_user, login_required
from flask_jwt_extended import (create_access_token)
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, url_for, request, redirect, flash, jsonify


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


@app.route('/')
def index():
    print("loading!!!!")
    return render_template('index.html')


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

    # last_name = request.get_json()['last_name']
    # email = request.get_json()['email']
    # password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    # created = datetime.utcnow()

    cur.execute("SELECT title, id, genres, vote_average FROM Movies WHERE title like '%" +
                str(search_query)+"%'")
    # mysql.connection.commit()

    res = cur.fetchall()
    res = json.dumps(res)
    print(res)
    print(type(res))
    return res


@app.route('/login', methods=['GET', 'POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    user = User.query.filter_by(email=email).first()
    if user is None:
        result = jsonify({"Error": "Invalid email or password"})
        return result
    elif bcrypt.check_password_hash(user.get_password(), password):
        login_user(user)
        access_token = create_access_token(
            identity={"email": user.get_email()})
        result = access_token
    else:
        result = jsonify({"error": "Invalid email and password"})

    print("------Successfully logged in-------")
    print(user.get_email())
    return result


@app.route('/register', methods=['GET', 'POST'])
def register():
    result = ""
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')

    print("got email: "+email)
    # if this returns a user, then the email already exists in database
    user = User.query.filter_by(email=email).first()
    print("-----type is:")
    print(type(user))

    if user is not None:  # if a user is found, we want to redirect back to signup page so user can try again
        print("-----------found user------------")
        result = jsonify({"Error": "Email has been registered already!"})
        # return redirect(url_for('register'))

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    newuser = User(email=email)
    newuser.set_password(password)
    db.session.add(newuser)
    db.session.commit()
    print("----added to user table-----")
    # return redirect(url_for('login'))
    access_token = create_access_token(
        identity={"email": newuser.get_email()})
    result = access_token
    print("success: ", result)
    return result


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('/'))


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


'''
email = request.args.get("email")
mvId = request.args.get("mvId")
'''
# check user favorite table[GET]
# if mvId not in favlist => return error


@app.route('/checkUserFav', methods=['GET'])
def checkUserFav():
    email = request.args.get("email")
    # email = 'gg@gmail.com'
    mvId = request.args.get("mvId")
    print("-----checkUserFav got email: ", email)
    print("-----checkUserFav got mvid: ", mvId)
    movie = FavMovie.query.filter_by(mid=mvId, email=email).first()
    result = ''

    if movie is None:  # this movie is not liked by the current user
        result = jsonify(
            {"error": "This movie is not liked by the current user"})
        return result
    else:
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
        return result

# insert into fav table [POST]


@app.route('/addToFav', methods=['POST'])
def addToFav():
    email = request.get_json()['email']
    mvId = request.get_json()['mvId']
    title = request.get_json()['title']
    # email = 'gg@gmail.com'
    # mvId = 673
    # title = 'Harry Potter and the Prisoner of Azkaban'
    print("-----addToFav got email: ", email)
    print("-----addToFav got mvid: ", mvId)
    print("-----addToFav got title: ", title)
    result = ''

    newfav = FavMovie(mid=mvId, email=email, title=title)
    db.session.add(newfav)
    db.session.commit()
    print("----Successfully added to fav_movie table-----")

    if newfav is None:
        result = jsonify(
            {"error": "Failed to add to Favorite table"})
        return result
    else:
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
        return result


# delete from fav table [DELETE]
@app.route('/deleteFromFav', methods=['POST'])
def deleteFromFav():
    email = request.get_json()['email']
    mvId = request.get_json()['mvId']
    title = request.get_json()['title']
    print("-----deleteFromFav got email: ", email)
    print("-----deleteFromFav got mvid: ", mvId)
    print("-----deleteFromFav got title: ", title)
    result = ''

    # movie_to_delete = FavMovie.query.filter_by(mid=mvId, email=email)
    # movie_to_delete.delete()

    # movie_to_delete = FavMovie(mvId, email)
    movie_to_delete = FavMovie.query.filter_by(mid=mvId, email=email).first()
    print(movie_to_delete)
    db.session.delete(movie_to_delete)
    db.session.commit()
    print("----Successfully delete from fav_movie table-----")

    if movie_to_delete is None:
        result = jsonify(
            {"error": "Failed to delete from Favorite table"})
        return result
    else:
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
        return result


# update fav movie notes
@app.route('/updateMovComment', methods=['PATCH'])
def updateMovComment():
    print("-------------")
    print(request)
    print(request.get_json())
    print("-------------")
    email = request.get_json()['query'][1]
    mvId = request.get_json()['query'][2]
    notes = request.get_json()['query'][0][0]
    print("-----updateMovComment got email: ", email)
    print("-----updateMovComment got mvid: ", mvId)
    print("-----updateMovComment got notes: ", notes)
    result = ''

    movie_to_update = FavMovie.query.filter_by(mid=mvId, email=email).first()
    movie_to_update.notes = notes
    db.session.commit()

    if movie_to_update is None:
        result = jsonify(
            {"error": "Failed to update Favorite table"})
        return result
    else:
        print("----Successfully updated fav_movie table-----")
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
    return result

# show fav movies


@app.route('/getUserFav', methods=['GET'])
def getUserFav():
    print("-------------")
    # email = request.get_json()['email']
    email = request.args.get("email")
    print("-----updateMovComment got email: ", email)
    result = ''
    favorites = []

    fav_movie_list = FavMovie.query.filter_by(email=email).all()

    if fav_movie_list is None:  # this movie is not liked by the current user
        result = jsonify(
            {"error": "no favorite movies"})
        return result
    else:
        for movie in fav_movie_list:
            mvId = movie.mid
            print("mvid is: ", mvId)
            title = movie.title
            notes = movie.notes
            favorites.append(
                {'movie_id': mvId, 'title': title, 'notes': notes})
        # favorites is a list of json strings [{},{},{}...]
        result = jsonify({'movies': favorites})
    return result
