# from app import routes, models
from flask_login import LoginManager
from flask_login import login_user, logout_user, current_user, login_required
from flask_jwt_extended import (create_access_token)
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
# from config import Config
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, url_for, request, redirect, flash, jsonify
import os
from flask_pymongo import PyMongo
from pymongo import MongoClient

# app = Flask(__name__, template_folder='../templates',
#             static_url_path='/static', static_folder='../static')

app = Flask(__name__, static_url_path='/static',
            static_folder='../static', template_folder='../templates')
# app.config.from_object(Config)
# app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:////Users/quanweigu/cs411project/app/app.db'
app.config['SECRET_KEY'] = 'secret-key-goes-here'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
db.app = app
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'
login.init_app(app)
mongoClient = MongoClient('mongodb://127.0.0.1:27017')
mongodb = mongoClient.get_database('MovieReviews')
movieReview = mongodb.get_collection('movieReview')

# movieReview.insert(
#     {"mid": 557, "email": "quanwei2@illinois.edu", "review": "spiderman"})

# movieReview.insert(
#     {"mid": 8961, "email": "quanwei2@illinois.edu", "review": "I am a good boy"})
# movieReview.deleteOne({"mid": 19995.0})
for document in movieReview.find():
    # print each document
    print(document)
CORS(app)

print("whywhywhyhwyhwyhy!!!!!!")
if __name__ == '__main__':
    app.run(debug=True)
