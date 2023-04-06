import csv
import json
import sqlite3
from datetime import datetime
from flask import Flask, render_template, url_for, request, redirect, flash, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from flask_sqlalchemy import SQLAlchemy
from . import app, db, bcrypt, jwt
from app.forms import LoginForm, SignupForm
from app.models import User, FavMovie

# initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Movie.db'

# initialize database
db = SQLAlchemy(app)

# initialize bcrypt
bcrypt = Bcrypt(app)

# initialize JWT manager
jwt = JWTManager(app)

# initialize login manager
login_manager = LoginManager()
login_manager.init_app(app)

# connect to SQLite database
conn = sqlite3.connect("Movie.db")
curs = conn.cursor()

# test query
curs.execute("SELECT title FROM Movies WHERE vote_average > 7")
conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    # connect to SQLite database
    conn = sqlite3.connect("Movie.db")
    cur = conn.cursor()
    # get search query
    search_query = request.args.get("name")
    # execute search query
    cur.execute("SELECT title, id, genres, vote_average FROM Movies WHERE title like '%" + str(search_query) + "%'")
    # fetch all results
    res = cur.fetchall()
    # convert to JSON string
    res = json.dumps(res)
    return res

@app.route('/login', methods=['POST'])
def login():
    # get email and password from request body
    email = request.json['email']
    password = request.json['password']
    result = ""
    # find user with the given email
    user = User.query.filter_by(email=email).first()
    # if user is not found
    if user is None:
        result = jsonify({"Error": "Invalid email or password"})
        return result
    # if password is correct
    elif bcrypt.check_password_hash(user.get_password(), password):
        # log in user
        login_user(user)
        # create access token
        access_token = create_access_token(identity={"email": user.get_email()})
        result = access_token
    # if password is incorrect
    else:
        result = jsonify({"error": "Invalid email and password"})
    return result

@app.route('/register', methods=['POST'])
def register():
    result = ""
    # get email and password from request body
    email = request.json['email']
    password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
    # find user with the given email
    user = User.query.filter_by(email=email).first()
    # if user already exists
    if user is not None:
        result = jsonify({"Error": "Email has been registered already!"})
    else:
        # create new user
        newuser = User(email=email)
        newuser.set_password(password)
        db.session.add(newuser)
        db.session.commit()
        # create access token
        access_token = create_access_token(identity={"email": newuser.get_email()})
        result = access_token
    return result

@app.route('/logout')
def logout():
    # log out user
    logout_user()
    return redirect(url_for('index'))



@app.route('/getMovieInfo', methods=['GET'])
def getMovieInfo():
    # connect to SQLite database
    conn = sqlite3.connect("Movie.db")
    cur = conn.cursor()
    # get movie ID
    mvId = request.args.get("mvId")
    # execute query to get movie information
    cur.execute("SELECT title, id, genres, release_year, vote_average, original_language, runtime, director, actors, overview FROM Movies WHERE id = " + str(mvId))
    # fetch all results
    res = cur.fetchall()
    # convert to JSON string
    res = json.dumps(res)
    return res

@app.route('/checkUserFav', methods=['GET'])
def checkUserFav():
    # get email and movie ID
    email = request.args.get("email")
    mvId = request.args.get("mvId")
    movie = FavMovie.query.filter_by(mid=mvId, email=email).first()
    result = ''
    # if movie is not found in favorites
    if movie is None:
        result = jsonify({"error": "This movie is not liked by the current user"})
        return result
    else:
        # create access token
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
        return result

@app.route('/addToFav', methods=['POST'])
def addToFav():
    # get email, movie ID, and movie title
    email = request.json['email']
    mvId = request.json['mvId']
    title = request.json['title']
    result = ''
    # create new favorite movie
    newfav = FavMovie(mid=mvId, email=email, title=title)
    db.session.add(newfav)
    db.session.commit()
    # if adding to favorites fails
    if newfav is None:
        result = jsonify({"error": "Failed to add to Favorite table"})
        return result
    else:
        # create access token
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
        return result

@app.route('/deleteFromFav', methods=['POST'])
def deleteFromFav():
    # get email, movie ID, and movie title
    email = request.json['email']
    mvId = request.json['mvId']
    title = request.json['title']
    result = ''
    # find favorite movie to delete
    movie_to_delete = FavMovie.query.filter_by(mid=mvId, email=email).first()
    db.session.delete(movie_to_delete)
    db.session.commit()
    # if deleting from favorites fails
    if movie_to_delete is None:
        result = jsonify({"error": "Failed to delete from Favorite table"})
        return result
    else:
        # create access token
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
        return result

@app.route('/updateMovComment', methods=['PATCH'])
def updateMovComment():
    # get email, movie ID, and notes
    email = request.json['query'][1]
    mvId = request.json['query'][2]
    notes = request.json['query'][0][0]
    result = ''
    # find favorite movie to update
    movie_to_update = FavMovie.query.filter_by(mid=mvId, email=email).first()
    movie_to_update.notes = notes
    db.session.commit()
    # if updating favorite movie fails
    if movie_to_update is None:
        result = jsonify({"error": "Failed to update Favorite table"})
        return result
    else:
        # create access token
        access_token = create_access_token(identity={"mid": mvId})
        result = access_token
    return result


@app.route('/getUserFav', methods=['GET'])
def getUserFav():
    # get email
    email = request.args.get("email")
    result = ''
    favorites = []
    # find all favorite movies for user
    fav_movie_list = FavMovie.query.filter_by(email=email).all()
    # if no favorite movies found
    if fav_movie_list is None:
        result = jsonify({"error": "No favorite movies"})
        return result
    else:
        # loop through favorite movies and create JSON response
        for movie in fav_movie_list:
            mvId = movie.mid
            title = movie.title
            notes = movie.notes
            favorites.append({'movie_id': mvId, 'title': title, 'notes': notes})
        result = jsonify({'movies': favorites})
    return result

@app.route('/getRecMovies', methods=['GET'])
def getRecMovies():
    print("-------------getRecMovies-------------")
    email = request.args.get("email")
    result = ''
    rec_movie_list = []

    fav_movie_list = FavMovie.query.filter_by(email=email).all()

    if fav_movie_list is None:
        result = jsonify(
            {"error": "no favorite movies"})
        return result
    else:
        print("-------------The list of RecMovies-------------")
        for movie in fav_movie_list:
            rec_movies = recommend(movie.title)
            print(rec_movies)
            for rec_m in rec_movies:
                conn = sqlite3.connect("Movie.db")
                cur = conn.cursor()
                cur.execute(
                    "SELECT title, id FROM Movies WHERE title like '%" + str(rec_m)+"%'")
                res = cur.fetchall()
                print(res)
                title = res[0][0]
                mvId = int(res[0][1])
                print("title is: ", title)
                print("mid is: ", mvId)
                rec_movie_list.append({'movie_id': mvId, 'title': title})

        result = jsonify({'movies': rec_movie_list})
    return result


@app.route('/getPosterPath', methods=['GET'])
def getPosterPath():
    mvId = request.args.get("mvId")
    movie_link = "https://api.themoviedb.org/3/movie/" + \
        str(mvId) + "?api_key=21448a0b1b8436c9d47ee36bc038b72a"
    f = requests.get(movie_link)
    data = f.text
    # print(type(data))
    s = json.loads(data)
    half_path = s['poster_path']
    res = " \"http://image.tmdb.org/t/p/w300" + half_path + "\""
    print("movie id is : ", mvId)
    print("the poster path is: ", res)
    return res


@app.route('/addReview/<review>/<mid>/<email>')
def addReview(review, mid, email):
    print("--------addReview--------")
    print("review is: ", review)
    print("email is: ", email)
    print("mid is: ", mid)
    print("------------------------")
    movieReview.insert_one({"mid": mid, "email": str(email), "review": review})
    # movieReview.insert_one({"review": review.lower()})
    print("url for getreviews: ", url_for('getReviews', mid=mid))
    # return redirect(url_for('getReviews/' + mid + '/' + email))
    return redirect(url_for('getReviews', mid=mid))


@app.route('/getReviews/<mid>')
def getReviews(mid):
    print("--------getReviews--------")
    print("mid is: ", mid)
    print(type(mid))
    reviews_json = []
    if movieReview.find():
        for review in movieReview.find({"mid": mid}).sort("review"):
            print("review is: ", review)
            print("email_ is: ", review['email'])
            reviews_json.append(
                {"review": review['review'], "id": str(review['_id']), "email": str(review['email'])})
    return json.dumps(reviews_json)


@app.route('/getPopularMovies/', methods=['GET'])
def getPopularMovies():
    conn = sqlite3.connect("app/app.db")
    print("-------connected to db--------")
    cur = conn.cursor()

    # return popular movies (popularity >= 60) with a rating >= 6.0 and liked by at least 3 users
    query = "SELECT Movies.title, Movies.id, Movies.genres, Movies.vote_average " \
            "FROM (SELECT Movies.id, count(email) AS cnt "\
            " FROM Movies JOIN fav_movie ON Movies.id=fav_movie.mid "\
            " GROUP BY Movies.id" \
            ") as temp JOIN Movies ON temp.id=Movies.id " \
            "WHERE cnt>=3 AND Movies.popularity>=50 AND Movies.vote_average>=6"
    cur.execute(query)
    res = cur.fetchall()
    res = json.dumps(res)
    return res
