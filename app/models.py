from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
# from datetime import datetime
from flask_login import UserMixin

print("class loaded!!!!!!!!!!")


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.email)

    def set_password(self, password):
        self.password_hash = password

    def get_email(self):
        return self.email

    def get_password(self):
        return self.password_hash

    @login.user_loader
    # @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))


class FavMovie(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    mid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), primary_key=True)
    title = db.Column(db.String(200))
    notes = db.Column(db.String(200))

    def __init__(self, mid, email, title='', notes=''):
        self.email = email
        self.mid = mid
        self.title = title
        self.notes = notes


def init_db():
    db.create_all()


if __name__ == '__main__':
    init_db()
