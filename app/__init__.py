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

# app = Flask(__name__, template_folder='../templates',
#             static_url_path='/static', static_folder='../static')

app = Flask(__name__, static_url_path='/static',
            static_folder='../static', template_folder='../templates')
# app.config.from_object(Config)
# app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:////Users/quanweigu/movie_rec/app/app.db'
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

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
